import { z } from 'zod'

export const signinSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z
    .string('La contraseña es requerida')
    .min(1, 'La contraseña es requerida'),
})

export type SigninSchemaType = z.infer<typeof signinSchema>
