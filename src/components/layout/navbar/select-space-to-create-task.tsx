import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { useLoaderData } from '@tanstack/react-router'
import { SelectSpaces } from './SelectSpaces'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const SelectSpaceToCreateTask = ({ open, onOpenChange }: Props) => {
  const { spaces } = useLoaderData({ from: '/w/$workspaceCode' })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Espacios disponibles</DialogTitle>
          <DialogDescription>
            Selecciona el espacio donde quieres crear la tarea.
          </DialogDescription>
        </DialogHeader>
        {/* ? Cuerpo del dialog: */}
        <SelectSpaces spaces={spaces} />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
