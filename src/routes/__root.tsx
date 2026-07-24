import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from '@/components/ui/sonner'
import '../styles.css'
import { TooltipProvider } from '#/components/ui/tooltip'
import { queryClient } from '#/lib/query-client'
import { meQueryOptions } from '#/features/auth/queries/auth.queries'

export const Route = createRootRoute({
  beforeLoad: async () => {
    const user = await queryClient
      .ensureQueryData(meQueryOptions())
      .catch(() => null)

    return { user }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <TooltipProvider>
        <Toaster />
        <Outlet />
      </TooltipProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
