import { greenApi } from '../client'

import type {
  ChatDto,
  ChatMessageDto,
  GetChatHistoryParams,
} from './chat.types'

export function getChats(count?: number) {
  return greenApi<Array<ChatDto>>('getChats', { query: { count } })
}

export function getChatHistory({ chatId, count }: GetChatHistoryParams) {
  return greenApi<Array<ChatMessageDto>>('getChatHistory', {
    body: { chatId, count },
  })
}

export function getChatMessageText(message: ChatMessageDto) {
  return (
    message.textMessage ??
    message.extendedTextMessage?.text ??
    message.caption ??
    ''
  )
}
