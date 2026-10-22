import { mutationOptions } from '@tanstack/react-query'

import { checkAccount, readChat, sendMessage } from './chat'
import { chatQueries } from './chat.queries'

export const chatMutations = {
  sendMessage: () =>
    mutationOptions({
      mutationKey: [...chatQueries.all(), 'sendMessage'] as const,
      mutationFn: sendMessage,
    }),

  readChat: () =>
    mutationOptions({
      mutationKey: [...chatQueries.all(), 'readChat'] as const,
      mutationFn: readChat,
    }),

  checkAccount: () =>
    mutationOptions({
      mutationKey: [...chatQueries.all(), 'checkAccount'] as const,
      mutationFn: checkAccount,
    }),
}
