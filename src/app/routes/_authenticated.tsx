import { createFileRoute, redirect } from '@tanstack/react-router'

import { AuthenticatedLayout } from '@/app/layouts/authenticated-layout'
import { getIsAuthenticated } from '@/shared/auth'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: () => {
    if (!getIsAuthenticated()) {
      throw redirect({ to: '/auth' })
    }
  },
  component: AuthenticatedLayout,
})
