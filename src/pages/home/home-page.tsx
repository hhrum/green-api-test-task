import { ChatsListHeader } from '@/entities/chat'
import { NewChatAction } from '@/feature/chat'
import { ChatsList } from '@/widgets/chat'

export function HomePage() {
  return (
    <div className="p-1">
      <ChatsListHeader action={<NewChatAction />} />
      <ChatsList />
    </div>
  )
}
