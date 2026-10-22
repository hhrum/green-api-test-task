import { mutationOptions } from '@tanstack/react-query'

import { setSettings } from './profile'
import { profileQueries } from './profile.queries'

export const profileMutations = {
  setSettings: () =>
    mutationOptions({
      mutationKey: [...profileQueries.all(), 'setSettings'] as const,
      mutationFn: setSettings,
    }),
}
