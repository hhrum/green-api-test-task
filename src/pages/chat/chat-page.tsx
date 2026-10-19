import { ChatHeader } from '@/entities/chat'
import { ChatMessages } from '@/widgets/chat'
import { ChatSendMessageForm } from '@/widgets/chat/chat-send-message-form'

export function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <ChatHeader />
      <ChatMessages />
      <ChatSendMessageForm />
    </div>
  )
}
