import { AppSidebar } from '#/components/layout/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { mySpacesQueryOptions } from '#/features/space/queries/space.queries'
import { meWorkspacesQueryOptions } from '#/features/workspace/queries/workspace.queries'
import { useRealtimeTaskUpdates } from '#/features/tasks/hooks/use-realtime-task-updates'
import { queryClient } from '#/lib/query-client'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { NavbarApp } from '#/components/layout/navbar/navbar-app'

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
    const [workspaces, spaces] = await Promise.all([
      queryClient.ensureQueryData(meWorkspacesQueryOptions()).catch(() => []),
      queryClient
        .ensureQueryData(mySpacesQueryOptions(params.workspaceCode))
        .catch(() => []),
    ])

    const workspace = workspaces.find((w) => w.code === params.workspaceCode)

    return { spaces, crumb: workspace?.name ?? params.workspaceCode }
  },
  component: RouteComponent,
})

function RouteComponent() {
  useRealtimeTaskUpdates()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavbarApp />
        <main className="min-h-0 min-w-0 flex-1 overflow-auto p-6 no-scrollbar">
          <div className="size-full container mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
