import type { ReactNode } from 'react'

export function ChatsListHeader({ action }: { action?: ReactNode }) {
  return (
    <>
      <div className="px-2 py-2 flex items-center justify-between">
        <span className="text-2xl font-medium">Чаты</span>
        {action}
      </div>
    </>
  )
}
