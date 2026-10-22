import { profileMutations } from '@/shared/api'
import type { ProfileSettingsDto } from '@/shared/api'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  Spinner,
} from '@/shared/shadcn/components'
import { useMutation } from '@tanstack/react-query'
import { cn } from 'cn'
import { Check } from 'lucide-react'
import { useState } from 'react'

const disableToggleOpen = () => null

export function TurnOnNotificationSettings({
  settings,
  onNeedRefreshSettings,
}: {
  settings: ProfileSettingsDto
  onNeedRefreshSettings: () => void
}) {
  const isTurnedOff =
    settings.outgoingWebhook === 'no' ||
    settings.stateWebhook === 'no' ||
    settings.incomingWebhook === 'no'

  const [open, setOpen] = useState(isTurnedOff)

  const settingsMutation = useMutation(profileMutations.setSettings())

  const handleToggleOn = () => {
    settingsMutation
      .mutateAsync({
        outgoingWebhook: 'yes',
        stateWebhook: 'yes',
        incomingWebhook: 'yes',
      })
      .then(() => {
        onNeedRefreshSettings()
      })
  }

  const renderListItem = (label: string, value: 'yes' | 'no') => {
    return (
      <li className="flex items-center justify-between">
        <span>{label}</span>
        <Check
          className={cn(
            'size-4',
            value === 'yes' ? 'text-green-500' : 'text-muted-foreground',
          )}
        />
      </li>
    )
  }

  return (
    <Drawer open={open} onOpenChange={disableToggleOpen}>
      <DrawerContent className="md:max-w-md md:mx-auto md:mb-10">
        <DrawerHeader>
          <DrawerTitle>Включите уведомления</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-2 p-4">
          <p>
            Green API не получает входящие сообщения без разрешенных настроек:
          </p>

          <ul className="list-disc list-inside">
            {renderListItem('outgoingWebhook', settings.outgoingWebhook)}
            {renderListItem('stateWebhook', settings.stateWebhook)}
            {renderListItem('incomingWebhook', settings.incomingWebhook)}
          </ul>
        </div>

        <DrawerFooter>
          {!settingsMutation.isSuccess && (
            <Button
              disabled={settingsMutation.isPending}
              onClick={handleToggleOn}
            >
              {settingsMutation.isPending && <Spinner className="size-4" />}
              Включить
            </Button>
          )}
          {settingsMutation.isSuccess && (
            <Button onClick={() => setOpen(false)} variant="secondary">
              Закрыть
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
