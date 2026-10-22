import { ChatsListHeader } from '@/entities/chat'
import { NewChatAction } from '@/feature/chat'
import { ChatsList } from '@/widgets/chat'

export function ChatsListPage() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatsListHeader action={<NewChatAction />} />
      <ChatsList />
    </div>
  )
}
