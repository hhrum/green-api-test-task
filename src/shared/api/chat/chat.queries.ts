import { queryOptions } from '@tanstack/react-query'

import { getChatHistory, getChats } from './chat'

export const chatQueries = {
  all: () => ['chats'] as const,

  lists: () => [...chatQueries.all(), 'list'] as const,

  list: (count?: number) =>
    queryOptions({
      queryKey: [...chatQueries.lists(), count ?? null] as const,
      queryFn: () => getChats(count),
      staleTime: 60_000,
    }),

  histories: () => [...chatQueries.all(), 'history'] as const,

  history: (chatId: string, count?: number) =>
    queryOptions({
      queryKey: [...chatQueries.histories(), chatId, count ?? null] as const,
      queryFn: () => getChatHistory({ chatId, count }),
      enabled: chatId.length > 0,
    }),
}
