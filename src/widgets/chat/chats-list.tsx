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

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (chatsQuery.isLoading) {
    return (
      <div className="flex justify-center p-6">
        <Spinner />
      </div>
    )
  }

  if (chatsQuery.isError) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Не удалось загрузить чаты</EmptyTitle>
          <EmptyDescription>{chatsQuery.error.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  if (!chatsQuery.data || chatsQuery.data.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>Чатов пока нет</EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className="flex flex-col md:max-w-100">
      {chatsQuery.data.map((chat) => (
        <ChatItem
          key={chat.chatId}
          name={chat.name || chat.chatId}
          unreadCount={chat.unreadCount}
        />
      ))}
    </div>
  )
}
