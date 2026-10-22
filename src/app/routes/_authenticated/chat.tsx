import { ChatShell } from '@/pages/chat'
import { Outlet, createFileRoute, useMatchRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chat')({
  component: ChatLayoutRoute,
})

function ChatLayoutRoute() {
  const matchRoute = useMatchRoute()
  const showConversation = Boolean(matchRoute({ to: '/chat/$chatId' }))

  return (
    <ChatShell showConversation={showConversation}>
      <Outlet />
    </ChatShell>
  )
}
