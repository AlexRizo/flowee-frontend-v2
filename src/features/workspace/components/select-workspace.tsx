import { useState } from 'react'
import type { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import type { Workspaces } from '../types'
import { Button } from '#/components/ui/button'
import { LogIn } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useFavoriteWorkspace } from '#/features/auth/queries/auth.queries'

interface Props {
  workspaces: Workspaces
}

export const SelectWorkspace: FC<Props> = ({ workspaces = [] }) => {
  const favoriteWorkspaceMutation = useFavoriteWorkspace()
  const navigate = useNavigate()
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>()

  const onChange = (workspaceCode: string) => {
    setSelectedWorkspace(workspaceCode)
  }

  const onSubmit = () => {
    if (selectedWorkspace === 'null' || !selectedWorkspace) return

    favoriteWorkspaceMutation.mutate(selectedWorkspace, {
      onSuccess: () => {
        navigate({
          to: '/w/$workspaceCode',
          params: { workspaceCode: selectedWorkspace },
        })
      },
    })
  }

  return (
    <div className="flex flex-col gap-5 my-4">
      <Select onValueChange={onChange} value={selectedWorkspace}>
        <SelectTrigger className="w-70">
          <SelectValue placeholder="Elije un workspace" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Workspaces</SelectLabel>
            {workspaces.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.code}>
                {workspace.name}
              </SelectItem>
            ))}
            {!workspaces.length && (
              <SelectItem value="null">-- No hay workspaces --</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button
        onClick={onSubmit}
        disabled={!selectedWorkspace || selectedWorkspace === 'null'}
      >
        Ingresar <LogIn />
      </Button>
    </div>
  )
}
