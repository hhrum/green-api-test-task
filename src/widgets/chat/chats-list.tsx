import { ChatItem } from '@/entities/chat'

export function ChatsList() {
  return (
    <div className="flex flex-col md:max-w-100">
      <ChatItem />
      <ChatItem fromMe />
      <ChatItem />
      <ChatItem />
    </div>
  )
}
