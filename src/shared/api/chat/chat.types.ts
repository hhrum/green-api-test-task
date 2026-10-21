export type ChatDto = {
  chatId: string
  name: string
  type: 'user' | 'group' | 'bot'
  phoneNumber: number
  unreadCount: number
}

export type ChatMessageDto = {
  type: 'incoming' | 'outgoing'
  idMessage: string
  timestamp: number
  typeMessage: string
  chatId: string
  textMessage?: string
  statusMessage?:
    'pending' | 'sent' | 'delivered' | 'read' | 'yellowCard' | 'failed'
  description?: string
  sendByApi?: boolean
  senderId?: string
  senderName?: string
  senderContactName?: string
  downloadUrl?: string
  caption?: string
  fileName?: string
  mimeType?: string
  isForwarded?: boolean
  isEdited?: boolean
  isDeleted?: boolean
  extendedTextMessage?: {
    text?: string
    description?: string
    title?: string
  }
}

export type GetChatHistoryParams = {
  chatId: string
  count?: number
}
