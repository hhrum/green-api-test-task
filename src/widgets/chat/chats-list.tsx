import { useQuery } from '@tanstack/react-query'

import { ChatItem } from '@/entities/chat'
import { chatQueries } from '@/shared/api'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Spinner,
} from '@/shared/shadcn/components'

export function ChatsList() {
  const chatsQuery = useQuery(chatQueries.list())

  if (chatsQuery.isLoading) {
    return (
      <div className="flex min-h-0 flex-1 justify-center p-6">
        <Spinner />
      </div>
    )
  }

  if (chatsQuery.isError) {
    return (
      <Empty className="min-h-0 flex-1 border-none">
        <EmptyHeader>
          <EmptyTitle>Не удалось загрузить чаты</EmptyTitle>
          <EmptyDescription>{chatsQuery.error.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  if (!chatsQuery.data || chatsQuery.data.length === 0) {
    return (
      <Empty className="min-h-0 flex-1 border-none">
        <EmptyHeader>
          <EmptyTitle>Чатов пока нет</EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      {chatsQuery.data.map((chat) => (
        <ChatItem
          key={chat.chatId}
          chatId={chat.chatId}
          name={chat.name || chat.chatId}
          unreadCount={chat.unreadCount}
        />
      ))}
    </div>
  )
}
