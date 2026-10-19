import {
  Avatar,
  AvatarFallback,
  Button,
  Separator,
} from '@/shared/shadcn/components'
import { useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

export function ChatHeader() {
  const router = useRouter()
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()

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
          <AvatarFallback>Л</AvatarFallback>
        </Avatar>

        <div className="flex-1 flex flex-col">
          <span className="text-sm font-medium w-full text-ellipsis overflow-hidden">
            Любимая
          </span>
          <span className="text-xs text-muted-foreground">Был(-а) недавно</span>
        </div>
      </div>
      <Separator />
    </>
  )
}
