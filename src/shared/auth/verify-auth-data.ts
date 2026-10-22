export type AuthCredentials = {
  idInstance: string
  apiTokenInstance: string
}

export async function verifyAuthData(
  credentials: AuthCredentials,
): Promise<void> {
  const url = `https://api.green-api.com/waInstance${credentials.idInstance}/getStateInstance/${credentials.apiTokenInstance}`
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error('Failed to verify auth data')
  }

  // todo: handle data.stateInstance === 'authorized'
}
