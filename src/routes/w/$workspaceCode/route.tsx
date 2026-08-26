import { AppSidebar } from '#/components/layout/sidebar/app-sidebar'
import { Breadcrumbs } from '#/components/layout/navbar/breadcrumbs'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '#/components/ui/sidebar'
import { mySpacesQueryOptions } from '#/features/space/queries/space.queries'
import { meWorkspacesQueryOptions } from '#/features/workspace/queries/workspace.queries'
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
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex flex-row items-center border-b py-2.5 gap-2">
          <div className='border-r px-4'>
            <SidebarTrigger />
          </div>
          <Breadcrumbs />
        </header>
        <main className="flex-1 overflow-hidden container mx-auto m-10">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
