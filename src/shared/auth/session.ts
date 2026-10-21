import type { QueryClient } from '@tanstack/react-query'

import type { AuthCredentials } from './verify-auth-data'
import { verifyAuthData } from './verify-auth-data'

const ID_INSTANCE_KEY = 'idInstance'
const API_TOKEN_INSTANCE_KEY = 'apiTokenInstance'

let credentials: AuthCredentials | null = null
let initialized = false
let queryClient: QueryClient | null = null

export function registerQueryClient(client: QueryClient) {
  queryClient = client
}

export function initAuth() {
  if (initialized || typeof window === 'undefined') return

  const idInstance = window.localStorage.getItem(ID_INSTANCE_KEY)
  const apiTokenInstance = window.localStorage.getItem(API_TOKEN_INSTANCE_KEY)

  credentials =
    idInstance && apiTokenInstance ? { idInstance, apiTokenInstance } : null
  initialized = true
}

export function getIsAuthenticated() {
  initAuth()
  return credentials !== null
}

export function getCredentials(): AuthCredentials | null {
  initAuth()
  return credentials ? { ...credentials } : null
}

function persist(nextCredentials: AuthCredentials) {
  credentials = nextCredentials
  initialized = true

  if (typeof window === 'undefined') return

  window.localStorage.setItem(ID_INSTANCE_KEY, nextCredentials.idInstance)
  window.localStorage.setItem(
    API_TOKEN_INSTANCE_KEY,
    nextCredentials.apiTokenInstance,
  )
}

export async function login(nextCredentials: AuthCredentials) {
  await verifyAuthData(nextCredentials)
  persist(nextCredentials)
}

export function logout() {
  credentials = null
  initialized = true

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(ID_INSTANCE_KEY)
    window.localStorage.removeItem(API_TOKEN_INSTANCE_KEY)
  }

  queryClient?.clear()
}
