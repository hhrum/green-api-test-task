import { ChatPage } from '@/pages/chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chat/$chatId')({
  component: ChatPage,
})
