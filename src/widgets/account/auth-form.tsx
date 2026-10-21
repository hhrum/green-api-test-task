import { useNavigate } from '@tanstack/react-router'
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
} from '@/shared/shadcn/components'

export function AuthForm() {
  const navigate = useNavigate()

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
                Это безопасно? <a href="#">Узнать больше</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
