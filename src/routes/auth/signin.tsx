import { createFileRoute } from '@tanstack/react-router'
import { SigninForm } from '#/features/auth/components/signin-form'

export const Route = createFileRoute('/auth/signin')({
  component: SigninForm,
})
