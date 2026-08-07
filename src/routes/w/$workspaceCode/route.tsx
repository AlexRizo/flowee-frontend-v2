import { AppSidebar } from '#/components/layout/sidebar/app-sidebar'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar'
import { mySpacesQueryOptions } from '#/features/space/queries/space.queries'
import { queryClient } from '#/lib/query-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode')({
  beforeLoad: async ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: '/auth/signin',
        search: { redirect: location.href },
      })
    }
  },
  loader: async ({ params }) => {
    const spaces = await queryClient
      .ensureQueryData(mySpacesQueryOptions(params.workspaceCode))
      .catch(() => [])

    return { spaces }
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
