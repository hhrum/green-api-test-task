export type ChatDto = {
  chatId: string
  name: string
  type: 'user' | 'group' | 'bot'
  phoneNumber: number
  unreadCount: number
}

type ChatMessageChatType = 'user' | 'group'

type ChatMessageBase = {
  idMessage: string
  timestamp: number
  chatId: string
  chatType: ChatMessageChatType
}

type OutgoingChatMessageMeta = {
  type: 'outgoing'
  statusMessage: string
  sendByApi: boolean
}

type IncomingChatMessageMeta = {
  type: 'incoming'
  senderId: string
  senderName: string
  senderType: string
  senderContactName: string
}

type TextChatMessage = {
  typeMessage: 'textMessage'
  textMessage: string
}

type ExtendedTextChatMessage = {
  typeMessage: 'extendedTextMessage'
  textMessage: string
  extendedTextMessage: {
    text: string
    description: string
    title: string
    jpegThumbnail: string
    forwardingScore: number
    isForwarded: boolean
  }
}

type MediaChatMessageType =
  | 'stickerMessage'
  | 'imageMessage'
  | 'videoMessage'
  | 'documentMessage'
  | 'audioMessage'

type MediaChatMessage = {
  typeMessage: MediaChatMessageType
  downloadUrl: string
  downloadUrlJpeg?: string
  caption: string
  fileName: string
  jpegThumbnail: string
  isAnimated: boolean
  mimeType: string
  forwardingScore: number
  isForwarded: boolean
}

type PollChatMessage = {
  typeMessage: 'pollMessage'
  pollMessageData: {
    name: string
    options: Array<{ optionName: string }>
    allowToChangeAnswer: boolean
  }
}

type ReactionChatMessage = {
  typeMessage: 'reactionMessage'
  extendedTextMessageData: {
    text: string
  }
  quotedMessage: {
    stanzaId: string
    participant: string
  }
}

type ChatMessagePayload =
  | TextChatMessage
  | ExtendedTextChatMessage
  | MediaChatMessage
  | PollChatMessage
  | ReactionChatMessage

export type ChatMessageDto = ChatMessageBase &
  ChatMessagePayload &
  (OutgoingChatMessageMeta | IncomingChatMessageMeta)

export type GetChatHistoryParams = {
  chatId: string
  count?: number
}
