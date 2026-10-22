import type { ReactNode } from 'react'
import { cn } from 'cn'

import { ChatsListPage } from './chats-list-page'

export function ChatShell({
  showConversation,
  children,
}: {
  showConversation: boolean
  children: ReactNode
}) {
  return (
    <div className="flex h-dvh">
      <aside
        className={cn(
          'flex h-full min-h-0 w-full flex-col md:w-96 md:shrink-0 md:border-r',
          showConversation && 'max-md:hidden',
        )}
      >
        <ChatsListPage />
      </aside>
      <main
        className={cn(
          'flex min-h-0 min-w-0 flex-1 flex-col',
          !showConversation && 'max-md:hidden',
        )}
      >
        {children}
      </main>
    </div>
  )
}
