import { useParams } from '@tanstack/react-router'

import { ChatHeader } from '@/entities/chat'
import { ChatMessages } from '@/widgets/chat'
import { ChatSendMessageForm } from '@/widgets/chat/chat-send-message-form'

export function ChatPage() {
  const { chatId } = useParams({ from: '/_authenticated/chat/$chatId' })

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatSendMessageForm chatId={chatId} />
    </div>
  )
}
