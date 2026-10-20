import {
  Bubble,
  BubbleContent,
  Message,
  MessageContent,
} from '@/shared/shadcn/components'
import { CheckCheck } from 'lucide-react'
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
              {fromMe && <CheckCheck className="size-4 ml-1 mt-1 float-right text-blue-500" />}
              <time className="text-xs ml-1.5 leading-6.5 float-right text-muted-foreground">
                23:15
              </time>
            </p>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
