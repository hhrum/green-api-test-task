import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import { login } from '@/shared/auth'
import {
  Button,
  Card,
  Input,
  FieldLabel,
  FieldGroup,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldDescription,
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/shared/shadcn/components'

export function AuthForm() {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // todo: handle errors
    void login({
      idInstance: String(formData.get('idInstance') ?? ''),
      apiTokenInstance: String(formData.get('apiTokenInstance') ?? ''),
    }).then(() => navigate({ to: '/' }))
  }

  return (
    <>
      <Card className="w-full md:w-100">
        <CardHeader>
          <CardTitle>Войти в свой аккаунт</CardTitle>
          <CardDescription>
            Введите ваш idInstance и apiTokenInstance из панели Green API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="id">idInstance</FieldLabel>
                <Input id="id" name="idInstance" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="apiToken">apiTokenInstance</FieldLabel>
                <Input id="apiToken" name="apiTokenInstance" required />
              </Field>
              <Field>
                <Button type="submit">Войти</Button>
                <FieldDescription className="text-center">
                  Это безопасно?{' '}
                  <a onClick={() => setOpen(true)}>Узнать больше</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>О безопасности</DialogHeader>
          <div className="p-4 flex flex-col gap-2">
            <p>Данные лежат в 'localStorage'. Нигде более не сохраняются.</p>
            <p>
              idInstance и apiTokenInstance отправляются в сыром виде в запрос к
              Green API. Такой метод уязвим для MITM-атак.
            </p>
            <p>
              Для большей безопасности рекомендуется использовать HTTPS и
              зашифрованные соединения.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
