import { Empty, EmptyHeader, EmptyTitle } from '@/shared/shadcn/components'

export function ChatEmptyPage() {
  return (
    <Empty className="h-full border-none">
      <EmptyHeader>
        <EmptyTitle>Выберите чат</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
