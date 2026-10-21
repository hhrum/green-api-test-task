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
} from '@/shared/shadcn/components'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

export function NewChatAction() {
  const [verified, _] = useState(false)

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="ghost" size="icon">
          <PlusIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Новый чат</DrawerTitle>
          <DrawerDescription>Введите номер телефона</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-1 p-4">
          <InputGroup>
            <InputGroupInput placeholder="8 (999) 999-99-99" />
            <InputGroupAddon align="inline-end">
              <CheckIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <DrawerFooter>
          <Button disabled={!verified}>Создать</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
