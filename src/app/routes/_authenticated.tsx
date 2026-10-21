import { createFileRoute, redirect } from '@tanstack/react-router'

import { getIsAuthenticated } from '@/shared/auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (!getIsAuthenticated()) {
      throw redirect({ to: '/auth' })
    }
  },
})
