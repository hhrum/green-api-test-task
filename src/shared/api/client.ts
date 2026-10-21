import { getCredentials } from '@/shared/auth'
import type { AuthCredentials } from '@/shared/auth'

const API_ORIGIN = 'https://api.green-api.com'

export class GreenApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'GreenApiError'
    this.status = status
  }
}

type GreenApiRequest = {
  method?: 'GET' | 'POST'
  body?: unknown
  query?: Record<string, string | number | undefined>
  credentials?: AuthCredentials
}

export async function greenApi<T>(
  methodName: string,
  request: GreenApiRequest = {},
): Promise<T> {
  const credentials = request.credentials ?? getCredentials()

  if (!credentials) {
    throw new GreenApiError('Missing Green API credentials', 401)
  }

  const url = new URL(
    `${API_ORIGIN}/waInstance${encodeURIComponent(credentials.idInstance)}/${methodName}/${encodeURIComponent(credentials.apiTokenInstance)}`,
  )

  for (const [key, value] of Object.entries(request.query ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }

  const hasBody = request.body !== undefined
  const response = await fetch(url, {
    method: request.method ?? (hasBody ? 'POST' : 'GET'),
    headers: hasBody ? { 'Content-Type': 'application/json' } : undefined,
    body: hasBody ? JSON.stringify(request.body) : undefined,
  })

  if (!response.ok) {
    const details = (await response.text()).trim()
    throw new GreenApiError(
      details || `Green API ${methodName} failed`,
      response.status,
    )
  }

  return response.json() as Promise<T>
}
