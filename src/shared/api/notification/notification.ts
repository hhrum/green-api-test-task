import { greenApi } from '../client'

import type {
  DeleteNotificationDto,
  IncomingTextNotificationDto,
  ReceiveNotificationDto,
  ReceiveNotificationParams,
} from './notification.types'

export function receiveNotification(
  { receiveTimeout }: ReceiveNotificationParams = {},
  signal?: AbortSignal,
) {
  return greenApi<ReceiveNotificationDto | null>('receiveNotification', {
    query: { receiveTimeout },
    signal,
  })
}

export function deleteNotification(receiptId: number, signal?: AbortSignal) {
  return greenApi<DeleteNotificationDto>('deleteNotification', {
    method: 'DELETE',
    suffix: String(receiptId),
    signal,
  })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function readString(value: unknown) {
  return typeof value === 'string' ? value : undefined
}

function readNumber(value: unknown) {
  return typeof value === 'number' ? value : undefined
}

export function readIncomingTextNotification(
  notification: ReceiveNotificationDto,
): IncomingTextNotificationDto | null {
  const { body } = notification
  if (!isRecord(body)) return null
  if (body.typeWebhook !== 'incomingMessageReceived') return null

  const messageData = body.messageData
  if (!isRecord(messageData) || messageData.typeMessage !== 'textMessage') {
    return null
  }

  const textMessageData = messageData.textMessageData
  const textMessage = isRecord(textMessageData)
    ? readString(textMessageData.textMessage)
    : undefined
  const idMessage = readString(body.idMessage)
  const timestamp = readNumber(body.timestamp)
  const senderData = body.senderData
  const chatId = isRecord(senderData)
    ? readString(senderData.chatId)
    : undefined

  if (
    textMessage === undefined ||
    !idMessage ||
    timestamp === undefined ||
    !chatId
  ) {
    return null
  }

  const sender = senderData as Record<string, unknown>
  const instanceData = isRecord(body.instanceData)
    ? body.instanceData
    : undefined

  return {
    receiptId: notification.receiptId,
    body: {
      typeWebhook: 'incomingMessageReceived',
      instanceData: {
        idInstance: readNumber(instanceData?.idInstance) ?? 0,
        wid: readString(instanceData?.wid) ?? '',
        typeInstance: readString(instanceData?.typeInstance) ?? '',
      },
      timestamp,
      idMessage,
      senderData: {
        chatId,
        chatName: readString(sender.chatName) ?? '',
        chatType: sender.chatType === 'group' ? 'group' : 'user',
        sender: readString(sender.sender) ?? chatId,
        senderName: readString(sender.senderName) ?? '',
        senderType: readString(sender.senderType) ?? 'user',
        senderContactName: readString(sender.senderContactName) ?? '',
        senderPhoneNumber: readNumber(sender.senderPhoneNumber) ?? 0,
      },
      messageData: {
        typeMessage: 'textMessage',
        textMessageData: {
          textMessage,
        },
      },
    },
  }
}
