import {
  Avatar,
  AvatarFallback,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/shared/shadcn/components'
import { CheckCheck } from 'lucide-react'

export function ChatItem() {
  return (
    <Item className="hover:bg-muted rounded-none cursor-pointer" size="xs">
      <ItemMedia>
        <Avatar size="lg">
          <AvatarFallback>Л</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="w-full">
          {/* chat-name */}
          <span className='flex-1'>Любимая</span>

          {/* read-status */}
          <CheckCheck className='size-4 text-blue-400' />

          {/* last-message-time */}
          <span className="font-light text-xs text-muted-foreground">
            21:32
          </span>
        </ItemTitle>
        <ItemDescription>купи сок</ItemDescription>
      </ItemContent>
    </Item>
  )
}
