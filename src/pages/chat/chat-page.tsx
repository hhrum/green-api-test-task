import { ChatHeader } from '@/entities/chat'
import { ChatMessages } from '@/widgets/chat'
import { ChatSendMessageForm } from '@/widgets/chat/chat-send-message-form'

export function ChatPage() {
  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <ChatHeader />
      <ChatMessages />
      <ChatSendMessageForm />
    </div>
  )
}
