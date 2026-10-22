import { chatMutations, chatQueries } from '@/shared/api'
import type { ChatDto, ChatMessageDto } from '@/shared/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

import { ChatHeader } from '@/entities/chat'
import { ChatMessages } from '@/widgets/chat'
import { ChatSendMessageForm } from '@/widgets/chat/chat-send-message-form'

export function ChatPage() {
  const { chatId } = useParams({ from: '/_authenticated/chat/$chatId' })
  const queryClient = useQueryClient()
  const chatsQuery = useQuery(chatQueries.list())
  const historyQuery = useQuery(chatQueries.history(chatId))
  const { mutate: markChatRead } = useMutation(chatMutations.readChat())
  const markedMessageIdRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    markedMessageIdRef.current = undefined
    markChatRead({ chatId })
  }, [chatId, markChatRead])

  useEffect(() => {
    const latestIncomingId = getLatestIncomingMessageId(historyQuery.data)
    if (!latestIncomingId || latestIncomingId === markedMessageIdRef.current) {
      return
    }

    markedMessageIdRef.current = latestIncomingId
    markChatRead({ chatId, idMessage: latestIncomingId })
  }, [chatId, historyQuery.data, markChatRead])

  useEffect(() => {
    const unreadCount = chatsQuery.data?.find(
      (chat) => chat.chatId === chatId,
    )?.unreadCount

    if (!unreadCount) return

    queryClient.setQueriesData<Array<ChatDto>>(
      { queryKey: chatQueries.lists() },
      (current) => {
        if (!current) return current

        return current.map((chat) =>
          chat.chatId === chatId ? { ...chat, unreadCount: 0 } : chat,
        )
      },
    )
  }, [chatId, chatsQuery.data, queryClient])

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatSendMessageForm chatId={chatId} />
    </div>
  )
}

function getLatestIncomingMessageId(
  messages: Array<ChatMessageDto> | undefined,
) {
  let latest: ChatMessageDto | undefined

  for (const message of messages ?? []) {
    if (message.type !== 'incoming') continue
    if (!latest || message.timestamp >= latest.timestamp) latest = message
  }

  return latest?.idMessage
}
