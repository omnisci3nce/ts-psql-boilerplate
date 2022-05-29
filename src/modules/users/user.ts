import { z } from 'zod'

export const UserDbSchema = z.object({
  id: z.string(),
  username: z.string().max(20),
  email: z.string().max(80),
  encrypted_password: z.string().max(64),
  created_at: z.date(),
  updated_at: z.date(),
  deleted: z.boolean()
})

export const UserDbDetails = z.object({
  username: z.string().max(20),
  email: z.string().max(80),
  encrypted_password: z.string().max(64),
})

export const UserSchema = UserDbSchema.transform(
  ({ encrypted_password, created_at, updated_at, ...rest }) => ({
    ...rest,
    // map db names to runtime names
    encryptedPassword: encrypted_password,
    createdAt: created_at,
    updatedAt: updated_at
  })
)

export const UserDetailsSchema = UserDbDetails.transform(
  ({ encrypted_password, ...rest }) => ({
    ...rest,
    // map db names to runtime names
    encryptedPassword: encrypted_password,
  })
)

export type UserDetails = z.infer<typeof UserDbDetails>;

export type User = z.infer<typeof UserDbSchema>;
