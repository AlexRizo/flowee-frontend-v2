import { useMatches } from '@tanstack/react-router'

export interface Breadcrumb {
  label: string
  path: string
}

export const useBreadcrumbs = (): Breadcrumb[] => {
  const matches = useMatches()

  const breadcrumbs: Breadcrumb[] = matches
    .filter(
      (match) =>
        typeof (match.loaderData as { crumb?: unknown } | undefined)?.crumb ===
        'string',
    )
    .map((match) => ({
      label: (match.loaderData as { crumb: string }).crumb,
      path: match.pathname,
    }))

  return breadcrumbs
}
