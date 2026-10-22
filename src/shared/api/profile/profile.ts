import { greenApi } from '../client'

import type {
  ProfileSettingsDto,
  SetSettingsDto,
  SetSettingsParams,
} from './profile.types'

export function getSettings() {
  return greenApi<ProfileSettingsDto>('getSettings')
}

export function setSettings(body: SetSettingsParams) {
  return greenApi<SetSettingsDto>('setSettings', { body })
}
