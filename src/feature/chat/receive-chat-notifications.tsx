import {
  chatQueries,
  deleteNotification,
  readIncomingTextNotification,
  receiveNotification,
} from '@/shared/api'
import type {
  ChatDto,
  ChatMessageDto,
  IncomingTextNotificationDto,
  ReceiveNotificationDto,
} from '@/shared/api'
import type { QueryClient, QueryKey } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

const notificationReceiveTimeout = 20
const retryDelayMs = 1000

const consumedReceiptIds = new Set<number>()
let chatListBaselineMs: number | undefined

export function ReceiveChatNotifications() {
  const queryClient = useQueryClient()
  const { chatId: activeChatId } = useParams({ strict: false })
  const activeChatIdRef = useRef(activeChatId)

  activeChatIdRef.current = activeChatId

  useEffect(() => {
    const controller = new AbortController()

    void listen(queryClient, activeChatIdRef, controller.signal)

    return () => controller.abort()
  }, [queryClient])

  return null
}

async function listen(
  queryClient: QueryClient,
  activeChatIdRef: RefObject<string | undefined>,
  signal: AbortSignal,
) {
  while (!signal.aborted) {
    try {
      const notification = await receiveNotification(
        { receiveTimeout: notificationReceiveTimeout },
        signal,
      )

      if (!notification) continue

      await consumeNotification(
        queryClient,
        notification,
        activeChatIdRef,
        signal,
      )
    } catch (error) {
      if (isAbortError(error)) return
      await delay(retryDelayMs, signal)
    }
  }
}

async function consumeNotification(
  queryClient: QueryClient,
  notification: ReceiveNotificationDto,
  activeChatIdRef: RefObject<string | undefined>,
  signal: AbortSignal,
) {
  if (consumedReceiptIds.has(notification.receiptId)) {
    await deleteNotification(notification.receiptId, signal)
    return
  }

  const incoming = readIncomingTextNotification(notification)
  if (!incoming) {
    await deleteNotification(notification.receiptId, signal)
    return
  }

  const message = toChatMessage(incoming)

  await mergeIncomingMessage(queryClient, message, signal)
  if (signal.aborted) return

  const isActiveChat = message.chatId === activeChatIdRef.current
  if (
    !isActiveChat &&
    isAfterChatListSnapshot(queryClient, message.timestamp)
  ) {
    incrementUnread(queryClient, message.chatId)
  }

  consumedReceiptIds.add(notification.receiptId)
  await deleteNotification(notification.receiptId, signal)
}

function toChatMessage(
  notification: IncomingTextNotificationDto,
): ChatMessageDto {
  const { body } = notification

  return {
    idMessage: body.idMessage,
    timestamp: body.timestamp,
    chatId: body.senderData.chatId,
    chatType: body.senderData.chatType,
    type: 'incoming',
    senderId: body.senderData.sender,
    senderName: body.senderData.senderName,
    senderType: body.senderData.senderType,
    senderContactName: body.senderData.senderContactName,
    typeMessage: 'textMessage',
    textMessage: body.messageData.textMessageData.textMessage,
  }
}

async function mergeIncomingMessage(
  queryClient: QueryClient,
  message: ChatMessageDto,
  signal: AbortSignal,
) {
  const queryKey = chatQueries.history(message.chatId).queryKey
  const query = queryClient.getQueryCache().find({ queryKey, exact: true })
  if (!query) return

  if (query.state.fetchStatus === 'fetching') {
    await waitForQueryIdle(queryClient, queryKey, signal)
    if (signal.aborted) return
  }

  queryClient.setQueryData<Array<ChatMessageDto>>(queryKey, (current) => {
    if (!current) return current
    if (current.some((item) => item.idMessage === message.idMessage)) {
      return current
    }

    const oldest = current.reduce(
      (min, item) => Math.min(min, item.timestamp),
      Number.POSITIVE_INFINITY,
    )
    if (current.length > 0 && message.timestamp < oldest) return current

    return [message, ...current]
  })
}

function waitForQueryIdle(
  queryClient: QueryClient,
  queryKey: QueryKey,
  signal: AbortSignal,
) {
  const isFetching = () =>
    queryClient.getQueryState(queryKey)?.fetchStatus === 'fetching'

  if (!isFetching()) return Promise.resolve()

  return new Promise<void>((resolve) => {
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      unsubscribe()
      signal.removeEventListener('abort', finish)
      resolve()
    }

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event.type !== 'updated') return
      if (!isSameQueryKey(event.query.queryKey, queryKey)) return
      if (event.query.state.fetchStatus === 'fetching') return
      finish()
    })

    if (!isFetching() || signal.aborted) finish()
    else signal.addEventListener('abort', finish)
  })
}

function isAfterChatListSnapshot(queryClient: QueryClient, timestamp: number) {
  if (chatListBaselineMs === undefined) {
    const state = queryClient.getQueryState(chatQueries.list().queryKey)
    if (state?.status !== 'success') return false
    chatListBaselineMs = state.dataUpdatedAt
  }

  return timestamp * 1000 > chatListBaselineMs
}

function incrementUnread(queryClient: QueryClient, chatId: string) {
  queryClient.setQueriesData<Array<ChatDto>>(
    { queryKey: chatQueries.lists() },
    (current) => {
      if (!current) return current

      return current.map((chat) =>
        chat.chatId === chatId
          ? { ...chat, unreadCount: chat.unreadCount + 1 }
          : chat,
      )
    },
  )
}

function isSameQueryKey(left: QueryKey, right: QueryKey) {
  return (
    left.length === right.length &&
    left.every((part, index) => Object.is(part, right[index]))
  )
}

function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) {
      resolve()
      return
    }

    const finish = () => {
      clearTimeout(timeoutId)
      signal.removeEventListener('abort', finish)
      resolve()
    }

    const timeoutId = setTimeout(finish, ms)
    signal.addEventListener('abort', finish)
  })
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === 'AbortError'
}
