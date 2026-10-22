import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'

import { ChatMessage } from '@/entities/chat'
import { chatQueries, getChatMessageText } from '@/shared/api'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  Spinner,
} from '@/shared/shadcn/components'

export function ChatMessages() {
  const { chatId } = useParams({ from: '/_authenticated/chat/$chatId' })
  const historyQuery = useQuery(chatQueries.history(chatId))

  if (historyQuery.isLoading) {
    return (
      <div className="flex min-h-0 flex-1 justify-center p-6">
        <Spinner />
      </div>
    )
  }

  if (historyQuery.isError) {
    return (
      <Empty className="min-h-0 flex-1 border-none">
        <EmptyHeader>
          <EmptyTitle>Не удалось загрузить сообщения</EmptyTitle>
          <EmptyDescription>{historyQuery.error.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  const messages = [...(historyQuery.data ?? [])].sort(
    (left, right) => left.timestamp - right.timestamp,
  )

  if (messages.length === 0) {
    return (
      <Empty className="min-h-0 flex-1 border-none">
        <EmptyHeader>
          <EmptyTitle>Сообщений пока нет</EmptyTitle>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <MessageScrollerProvider autoScroll defaultScrollPosition="end">
      <MessageScroller className="flex-1 p-2">
        <MessageScrollerViewport>
          <MessageScrollerContent className="justify-end pb-16">
            {messages.map((message, index) => (
              <MessageScrollerItem
                key={`${message.idMessage}-${message.timestamp}-${index}`}
                messageId={message.idMessage}
              >
                <ChatMessage
                  fromMe={message.type === 'outgoing'}
                  senderName={
                    message.chatType === 'group' && message.type === 'incoming'
                      ? message.senderName || message.senderContactName
                      : undefined
                  }
                  timestamp={message.timestamp}
                >
                  {getChatMessageText(message)}
                </ChatMessage>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton className="data-[direction=end]:bottom-16" />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
