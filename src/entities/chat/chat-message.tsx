import {
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
  MessageHeader,
} from '@/shared/shadcn/components'
import { CheckCheck } from 'lucide-react'
import type { PropsWithChildren } from 'react'

function formatMessageTime(timestamp: number) {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(timestamp * 1000)
}

export function ChatMessage({
  children,
  fromMe,
  senderName,
  timestamp,
}: PropsWithChildren<{
  fromMe?: boolean
  senderName?: string
  timestamp: number
}>) {
  return (
    <Message align={fromMe ? 'end' : 'start'}>
      <MessageContent>
        {senderName ? <MessageHeader>{senderName}</MessageHeader> : null}
        <Bubble
          variant={fromMe ? 'tinted' : 'muted'}
          align={fromMe ? 'end' : 'start'}
        >
          <BubbleContent>
            <p>
              {children}
              {fromMe && (
                <CheckCheck className="size-4 ml-1 mt-1 float-right text-blue-500" />
              )}
              <time className="text-xs ml-1.5 leading-6.5 float-right text-muted-foreground">
                {formatMessageTime(timestamp)}
              </time>
            </p>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
