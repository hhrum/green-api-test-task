import { ReceiveChatNotifications } from '@/feature/chat'
import { TurnOnNotificationSettings } from '@/feature/profile'
import { profileQueries } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'

export function AuthenticatedLayout() {
  const getSettingsQuery = useQuery(profileQueries.settings())
  const settings = getSettingsQuery.data

  return (
    <>
      <ReceiveChatNotifications />
      {getSettingsQuery.isPending ? (
        <div>Loading...</div>
      ) : !settings ? (
        'Произошла ошибка при загрузке настроек'
      ) : (
        <>
          <Outlet />
          <TurnOnNotificationSettings
            settings={settings}
            onNeedRefreshSettings={getSettingsQuery.refetch}
          />
        </>
      )}
    </>
  )
}
