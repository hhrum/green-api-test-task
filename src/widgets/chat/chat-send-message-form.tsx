import { chatMutations, chatQueries } from '@/shared/api'
import type { ChatMessageDto } from '@/shared/api'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from '@/shared/shadcn/components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Send } from 'lucide-react'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

export function ChatSendMessageForm({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState('')
  const queryClient = useQueryClient()

  const sendMessageMutation = useMutation(chatMutations.sendMessage())

  const isCanSend = message.trim().length > 0 && !sendMessageMutation.isPending

  const handleSendMessage = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isCanSend) return

    const text = message

    try {
      const { idMessage } = await sendMessageMutation.mutateAsync({
        chatId,
        message: text,
      })

      const sentMessage: ChatMessageDto = {
        idMessage,
        timestamp: Math.floor(Date.now() / 1000),
        chatId,
        chatType: chatId.endsWith('@g.us') ? 'group' : 'user',
        type: 'outgoing',
        statusMessage: 'pending',
        sendByApi: true,
        typeMessage: 'textMessage',
        textMessage: text,
      }

      queryClient.setQueryData<Array<ChatMessageDto>>(
        chatQueries.history(chatId).queryKey,
        (current) => (current ? [...current, sentMessage] : current),
      )
      setMessage('')
    } catch {
      return
    }
  }

  return (
    <form className="absolute inset-x-2 bottom-2" onSubmit={handleSendMessage}>
      <InputGroup className="items-end">
        <InputGroupTextarea
          className="min-h-auto mb-0.5 md:mb-1"
          rows={1}
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="submit"
            variant="default"
            size="icon-sm"
            disabled={!isCanSend}
          >
            <Send />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
