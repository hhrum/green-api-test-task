import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/shared/shadcn/components'
import { Send } from 'lucide-react'

export function ChatSendMessageForm() {
  return (
    <form className="absolute inset-x-2 bottom-2">
      <InputGroup className="items-end">
        <InputGroupTextarea className="min-h-auto" rows={1} placeholder='Сообщение' />

        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default" size="icon-sm">
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
