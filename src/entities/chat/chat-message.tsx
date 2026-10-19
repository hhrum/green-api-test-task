import {
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
} from '@/shared/shadcn/components'
import type { PropsWithChildren } from 'react'

export function ChatMessage({
  children,
  fromMe,
}: PropsWithChildren<{ fromMe?: boolean }>) {
  return (
    <Message>
      <MessageContent>
        <Bubble
          variant={fromMe ? 'tinted' : 'muted'}
          align={fromMe ? 'end' : 'start'}
        >
          <BubbleContent>
            <p>
              {children}
              <time className="text-xs ml-1 leading-6.5 float-right text-muted-foreground">
                23:15
              </time>
            </p>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
