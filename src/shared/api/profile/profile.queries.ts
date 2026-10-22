import { queryOptions } from '@tanstack/react-query'

import { getSettings } from './profile'

export const profileQueries = {
  all: () => ['profile'] as const,

  settings: () =>
    queryOptions({
      queryKey: [...profileQueries.all(), 'settings'] as const,
      queryFn: () => getSettings(),
    }),
}
