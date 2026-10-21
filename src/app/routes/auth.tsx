import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthPage } from '@/pages/auth'
import { getIsAuthenticated } from '@/shared/auth'

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    if (getIsAuthenticated()) {
      throw redirect({ to: '/' })
    }
  },
  component: AuthPage,
})
