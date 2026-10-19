import {
  Avatar,
  AvatarFallback,
  Badge,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/shared/shadcn/components'
import { Link } from '@tanstack/react-router'
import { CheckCheck } from 'lucide-react'

export function ChatItem({ fromMe }: { fromMe?: boolean }) {
  return (
    <Link to="/chat">
      <Item className="hover:bg-muted rounded-none cursor-pointer" size="xs">
        <ItemMedia>
          <Avatar size="lg">
            <AvatarFallback>Л</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <div className="flex gap-2 items-center">
            {/* chat-name */}
            <ItemTitle className="flex-1">Любимая</ItemTitle>

            {/* read-status */}
            {fromMe && <CheckCheck className="size-4 text-blue-400" />}

            {/* last-message-time */}
            <span className="font-light text-xs text-muted-foreground">
              21:32
            </span>
          </div>

          <div className="flex gap-2">
            <ItemDescription className="flex-1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </ItemDescription>

            {/* new-message-badge-counter */}
            {!fromMe && <Badge className="float-right">1</Badge>}
          </div>
        </ItemContent>
      </Item>
    </Link>
  )
}
