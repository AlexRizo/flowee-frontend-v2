import { Link } from '@tanstack/react-router'
import { ChevronRight, Home } from 'lucide-react'
import { Fragment } from 'react'
import { useBreadcrumbs } from '#/hooks/use-breadcrumbs'
import { cn } from '#/lib/utils'

export function Breadcrumbs() {
  const crumbs = useBreadcrumbs()

  if (crumbs.length === 0) return null

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className='flex gap-1'>
          <Home
            className="size-3.5 shrink-0 transition-colors hover:text-foreground"
            aria-hidden="true"
          />
          <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
        </Link>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1

          return (
            <Fragment key={crumb.path}>
              {index > 0 && (
                <ChevronRight
                  className="size-3.5 shrink-0"
                  aria-hidden="true"
                />
              )}
              <li className={cn(isLast && 'font-medium text-foreground')}>
                {isLast ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  // `to` viene de match.pathname (string dinámico), no de una
                  // ruta literal conocida por el router, por eso el cast.
                  <Link
                    to={crumb.path as never}
                    className="transition-colors hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
