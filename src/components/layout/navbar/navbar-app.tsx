import { SidebarTrigger } from '#/components/ui/sidebar'
import { Breadcrumbs } from './breadcrumbs'

export const NavbarApp = () => {
  return (
    <header className="flex flex-row items-center justify-between border-b py-2.5 gap-2">
      <div className="flex items-center gap-2">
        <div className="border-r px-3 mr-3">
          <SidebarTrigger />
        </div>
        <Breadcrumbs />
      </div>
      <div>
        {/* TODO: Especio disponible! */}
      </div>
    </header>
  )
}
