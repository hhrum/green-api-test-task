import { TurnOnNotificationSettings } from '@/feature/profile'
import { profileQueries } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'
import { Outlet } from '@tanstack/react-router'

export function AuthenticatedLayout() {
  const getSettingsQuery = useQuery(profileQueries.settings())

  if (getSettingsQuery.isPending) {
    return <div>Loading...</div>
  }

  if (!getSettingsQuery.data) {
    return "Произошла ошибка при загрузке настроек"
  }

  return (
    <>
      <Outlet />
      <TurnOnNotificationSettings settings={getSettingsQuery.data} onNeedRefreshSettings={getSettingsQuery.refetch} />
    </>
  )
}
