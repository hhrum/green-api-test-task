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
  name,
  unreadCount = 0,
}: {
  name: string
  unreadCount?: number
}) {
  return (
    <Link to="/chat">
      <Item className="hover:bg-muted rounded-none cursor-pointer" size="xs">
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
    </Link>
  )
}
