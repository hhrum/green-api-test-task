type YesNo = 'yes' | 'no'

export type ProfileSettingsDto = {
  wid: string
  typeInstance: string
  webhookUrl: string
  webhookUrlToken: string
  delaySendMessagesMilliseconds: number
  markIncomingMessagesReaded: YesNo
  markIncomingMessagesReadedOnReply: YesNo
  outgoingWebhook: YesNo
  outgoingMessageWebhook: YesNo
  outgoingAPIMessageWebhook: YesNo
  stateWebhook: YesNo
  incomingWebhook: YesNo
  editedMessageWebhook: YesNo
  deletedMessageWebhook: YesNo
  pollMessageWebhook: YesNo
  downloadUrlJpeg: YesNo
}

/** Все поля необязательны. `delaySendMessagesMilliseconds`: от 500 до 600000, рекомендуется не больше 300000. */
export type SetSettingsParams = Partial<
  Omit<ProfileSettingsDto, 'wid' | 'typeInstance'>
>

export type SetSettingsDto = {
  saveSettings: boolean
}
