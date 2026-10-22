import { useQuery } from '@tanstack/react-query'
import {
  useCanGoBack,
  useNavigate,
  useParams,
  useRouter,
} from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { chatQueries } from '@/shared/api'
import type { ChatDto } from '@/shared/api'
import {
  Avatar,
  AvatarFallback,
  Button,
  Separator,
} from '@/shared/shadcn/components'

export function ChatHeader() {
  const { chatId } = useParams({ from: '/_authenticated/chat/$chatId' })
  const router = useRouter()
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()

  const chatsQuery = useQuery(chatQueries.list())
  
  const chat = chatsQuery.data?.find((item) => item.chatId === chatId)
  const title = chat?.name || 'Новый чат'

  const handleGoBack = () => {
    if (canGoBack) {
      router.history.back()
    } else {
      navigate({ to: '/', replace: true })
    }
  }

  return (
    <>
      <div className="flex items-center gap-2 px-2 py-2">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft />
        </Button>
        <Avatar>
          <AvatarFallback>{title.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
            {title}
          </span>
          <span className="text-xs text-muted-foreground">
            {getChatSubtitle(chat)}
          </span>
        </div>
      </div>
      <Separator />
    </>
  )
}

function getChatSubtitle(chat: ChatDto | undefined) {
  if (!chat) return ''
  if (chat.type === 'group') return 'Группа'
  if (chat.type === 'bot') return 'Бот'
  if (chat.phoneNumber) return String(chat.phoneNumber)
  return ''
}
