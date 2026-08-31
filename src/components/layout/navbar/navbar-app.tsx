import { Button } from '#/components/ui/button'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { Plus } from 'lucide-react'
import { Breadcrumbs } from './breadcrumbs'
import { SelectSpaceToCreateTask } from './select-space-to-create-task'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'

export const NavbarApp = () => {
  const [open, setOpen] = useState<boolean>(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleCreateTask = () => {
    const currentLocation = location.pathname

    if (currentLocation.includes('/s')) {
      navigate({
        from: '/w/$workspaceCode/s/$spaceCode/',
        to: '/w/$workspaceCode/s/$spaceCode/tasks/create',
      })
      return
    }

    setOpen(true)
  }

  useEffect(() => {
    if (!open) return
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="flex flex-row items-center justify-between border-b py-2.5 gap-2 pr-3">
      <div className="flex items-center gap-2">
        <div className="border-r px-3 mr-3">
          <SidebarTrigger />
        </div>
        <Breadcrumbs />
      </div>
      <div>
        {/* TODO: Especio disponible! */}
        <Button size="sm" className="text-xs" onClick={handleCreateTask}>
          <Plus /> Nueva Tarea
        </Button>
        <SelectSpaceToCreateTask open={open} onOpenChange={setOpen} />
      </div>
    </header>
  )
}
