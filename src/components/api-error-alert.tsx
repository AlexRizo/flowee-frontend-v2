import { AlertCircleIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { ApiError } from '#/lib/api-client'

interface ApiErrorAlertProps {
  /** El error de una mutation/query. Solo pinta algo si es un ApiError. */
  error: unknown
  title?: string
}

export function ApiErrorAlert({ error, title }: ApiErrorAlertProps) {
  if (!(error instanceof ApiError)) return null

  const { detail } = error

  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {Array.isArray(detail) ? (
          // Errores de validación (class-validator): lista.
          <ul className="list-inside list-disc">
            {detail.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        ) : (
          // Excepción normal de Nest: un solo texto.
          <p>{detail}</p>
        )}
      </AlertDescription>
    </Alert>
  )
}
