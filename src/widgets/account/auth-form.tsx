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
  return (
    <Card className="min-w-100">
      <CardHeader>
        <CardTitle>Войти в свой аккаунт</CardTitle>
        <CardDescription>
          Введите ваш idInstance и apiTokenInstance из панели Green API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="id">idInstance</FieldLabel>
              <Input id="id" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="apiToken">apiTokenInstance</FieldLabel>
              <Input id="apiToken" required />
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
