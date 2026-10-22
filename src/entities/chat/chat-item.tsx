import {
  Avatar,
  AvatarFallback,
  Badge,
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from '@/shared/shadcn/components'
import { Link } from '@tanstack/react-router'

export function ChatItem({
  chatId,
  name,
  unreadCount = 0,
}: {
  chatId: string
  name: string
  unreadCount?: number
}) {
  return (
    <Item
      className="cursor-pointer rounded-none hover:bg-muted data-[status=active]:bg-muted"
      size="xs"
      render={<Link to="/chat/$chatId" params={{ chatId }} replace />}
    >
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <div className="flex gap-2 items-center">
          <ItemTitle className="flex-1">{name}</ItemTitle>
          {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
        </div>
      </ItemContent>
    </Item>
  )
}
