import { createFileRoute, Link } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { signinSchema } from '#/lib/schemas/auth/signin'
import type { SigninSchemaType } from '#/lib/schemas/auth/signin'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const submit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form onSubmit={submit} className="my-auto w-full">
      <article className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">¡Bienvenid@ de nuevo!</h1>
        <p className="text-muted-foreground">
          Inicia sesión para ingresar al sistema.
        </p>
      </article>

      <FieldGroup className="gap-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Correo electrónico</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="correo@ejemplo.com"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Contraseña</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="********"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="mt-6 w-full">
        Iniciar sesión
      </Button>
      <div className='mt-4 text-muted-foreground'>
        <p className="text-center text-sm">
          ¿No tienes una cuenta? <Link to="/auth/signup" className='underline hover:text-primary transition-colors'>Regístrate</Link>
        </p>
      </div>
    </form>
  )
}
