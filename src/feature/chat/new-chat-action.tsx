import { chatMutations } from '@/shared/api'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Spinner,
} from '@/shared/shadcn/components'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { cn } from 'cn'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import type { ChangeEvent } from 'react'

export function NewChatAction() {
  const [chatId, setChatId] = useState<string | undefined>(undefined)

  const verified = chatId !== undefined

  const readMessageMutation = useMutation(chatMutations.checkAccount())

  const handleVerify = (phone: string) => {
    readMessageMutation.mutateAsync({ phoneNumber: phone }).then((data) => {
      if (!data.exist) {
        return
      }

      setChatId(data.chatId)
    })
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length === 11) {
      handleVerify(value)
    }
  }

  return (
    <Drawer>
      <DrawerTrigger
        render={
          <Button variant="ghost" size="icon">
            <PlusIcon />
          </Button>
        }
      />
      <DrawerContent className="md:max-w-md md:mx-auto md:mb-10">
        <DrawerHeader>
          <DrawerTitle>Новый чат</DrawerTitle>
          <DrawerDescription>Введите номер телефона</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 p-4">
          <InputGroup>
            <InputGroupInput
              placeholder="8 (999) 999-99-99"
              disabled={readMessageMutation.isPending}
              onChange={handleInputChange}
            />
            <InputGroupAddon align="inline-end">
              {readMessageMutation.isPending && <Spinner />}
              {!readMessageMutation.isPending && <CheckIcon className={cn(verified && 'text-green-500')} />}
            </InputGroupAddon>
          </InputGroup>
        </div>
        <DrawerFooter>
          {verified && (
            <Link className="w-full flex flex-col" to="/chat/$chatId" params={{ chatId }} replace>
              <Button>Создать</Button>
            </Link>
          )}
          {!verified && (
            <Button disabled>Создать</Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
