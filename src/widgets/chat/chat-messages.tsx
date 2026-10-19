import {
  MessageScrollerContent,
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerButton,
  MessageScrollerItem,
} from '@/shared/shadcn/components'
import { ChatMessage } from '@/entities/chat'

export function ChatMessages() {
  return (
    <MessageScrollerProvider>
      <MessageScroller className="flex-1 p-2">
        <MessageScrollerViewport>
          <MessageScrollerContent>
            <MessageScrollerItem>
              <ChatMessage fromMe>Привет! Как дела?</ChatMessage>
            </MessageScrollerItem>
            <MessageScrollerItem>
              <ChatMessage>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </ChatMessage>
            </MessageScrollerItem>
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  )
}
