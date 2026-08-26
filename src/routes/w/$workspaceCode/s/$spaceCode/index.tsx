import { mySpacesQueryOptions } from '#/features/space/queries/space.queries'
import { queryClient } from '#/lib/query-client'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/w/$workspaceCode/s/$spaceCode/')({
  loader: async ({ params }) => {
    const spaces = await queryClient
      .ensureQueryData(mySpacesQueryOptions(params.workspaceCode))
      .catch(() => [])

    const space = spaces.find((s) => s.code === params.spaceCode)

    return { crumb: space?.name ?? params.spaceCode }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { workspaceCode, spaceCode } = Route.useParams()

  return (
    <div>
      Hello "/w/{workspaceCode}/{spaceCode}/"!
    </div>
  )
}
