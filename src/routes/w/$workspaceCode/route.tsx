import { AppSidebar } from '#/components/layout/sidebar/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar'
import { meQueryOptions } from '#/features/auth/queries/auth.queries'
import { queryClient } from '#/lib/query-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode')({
  beforeLoad: async () => {
    const user = await queryClient
      .ensureQueryData(meQueryOptions())
      .catch(() => null)

    if (!user) {
      throw redirect({ to: '/auth' })
    }

    return { user }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <main>
          <h1>{Route.id}</h1>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
