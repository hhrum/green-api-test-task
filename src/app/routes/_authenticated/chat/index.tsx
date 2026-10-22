import { ChatEmptyPage } from '@/pages/chat'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/chat/')({
  component: ChatEmptyPage,
})
