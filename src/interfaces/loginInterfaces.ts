import { z } from 'zod'
import { loginSchema } from '../schemas/loginSchema'

export type ILoginUser = z.infer<typeof loginSchema>