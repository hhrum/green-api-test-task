import { greenApi } from '../client'

import type {
  ChatDto,
  ChatMessageDto,
  GetChatHistoryParams,
  ReadChatDto,
  ReadChatParams,
  SendMessageDto,
  SendMessageParams,
} from './chat.types'

const mediaMessageLabel = {
  stickerMessage: 'Стикер',
  imageMessage: 'Изображение',
  videoMessage: 'Видео',
  documentMessage: 'Документ',
  audioMessage: 'Аудио',
} as const

export function getChats(count?: number) {
  return greenApi<Array<ChatDto>>('getChats', { query: { count } })
}

export function getChatHistory({ chatId, count }: GetChatHistoryParams) {
  return greenApi<Array<ChatMessageDto>>('getChatHistory', {
    body: { chatId, count },
  })
}

export function sendMessage(body: SendMessageParams) {
  return greenApi<SendMessageDto>('sendMessage', { body })
}

export function readChat(body: ReadChatParams) {
  return greenApi<ReadChatDto>('readChat', { body })
}

export function getChatMessageText(message: ChatMessageDto) {
  switch (message.typeMessage) {
    case 'textMessage':
      return message.textMessage
    case 'extendedTextMessage':
      return message.extendedTextMessage.text || message.textMessage
    case 'pollMessage':
      return message.pollMessageData.name
    case 'reactionMessage':
      return message.extendedTextMessageData.text
    case 'stickerMessage':
    case 'imageMessage':
    case 'videoMessage':
    case 'documentMessage':
    case 'audioMessage':
      return (
        message.caption ||
        message.fileName ||
        mediaMessageLabel[message.typeMessage]
      )
  }
}
