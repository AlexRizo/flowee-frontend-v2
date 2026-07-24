import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'
import { z } from 'zod'

export const Route = createFileRoute('/auth')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  beforeLoad: async ({ context, search }) => {
    if (context.user) {
      throw redirect({
        to: search.redirect || '/',
      })
    }

    toast.error('Ocurrió un error al iniciar sesión.')
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="h-screen w-screen">
      <section className="flex flex-row size-full">
        <aside className="bg-primary size-full" />
        <div className="min-w-lg p-14 flex">
          <Outlet />
        </div>
      </section>
    </main>
  )
}
