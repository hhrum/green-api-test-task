/** 5–60 seconds, default 5. */
export type ReceiveNotificationParams = {
  receiveTimeout?: number
}

export type ReceiveNotificationDto = {
  receiptId: number
  body: unknown
}

export type IncomingTextNotificationDto = {
  receiptId: number
  body: {
    typeWebhook: 'incomingMessageReceived'
    instanceData: {
      idInstance: number
      wid: string
      typeInstance: string
    }
    timestamp: number
    idMessage: string
    senderData: {
      chatId: string
      chatName: string
      chatType: 'user' | 'group'
      sender: string
      senderName: string
      senderType: string
      senderContactName: string
      senderPhoneNumber: number
    }
    messageData: {
      typeMessage: 'textMessage'
      textMessageData: {
        textMessage: string
      }
    }
  }
}

export type DeleteNotificationDto = {
  result: boolean
}
