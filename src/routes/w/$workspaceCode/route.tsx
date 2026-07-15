import { AppSidebar } from '#/components/layout/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '#/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger/>
        <main>
          <h1>{Route.id}</h1>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
