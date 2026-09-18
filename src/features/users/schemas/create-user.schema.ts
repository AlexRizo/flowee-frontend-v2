import { z } from 'zod'

export const createUserSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  username: z
    .string('El nombre de usuario es requerido')
    .min(3, 'El nombre de usuario debe tener entre 3 y 20 caracteres')
    .max(20, 'El nombre de usuario debe tener entre 3 y 20 caracteres')
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      'El nombre de usuario solo puede contener letras, números, ".", "-" y "_"',
    ),
  password: z
    .string('La contraseña es requerida')
    .min(8, 'La contraseña debe tener 8 caracteres como mínimo')
    .max(72, 'La contraseña debe tener 72 caracteres como máximo'),
  name: z
    .string('El nombre es requerido')
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre debe tener 100 caracteres como máximo'),
  avatar: z.string().max(500, 'La URL del avatar es demasiado larga').optional(),
})

export type CreateUserSchemaType = z.infer<typeof createUserSchema>