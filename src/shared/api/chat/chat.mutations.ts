import { mutationOptions } from '@tanstack/react-query'

import { sendMessage } from './chat'
import { chatQueries } from './chat.queries'

export const chatMutations = {
  sendMessage: () =>
    mutationOptions({
      mutationKey: [...chatQueries.all(), 'sendMessage'] as const,
      mutationFn: sendMessage,
    }),
}
