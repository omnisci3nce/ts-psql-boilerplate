import { z } from 'zod';

const roles = ['admin', 'sales', 'engineering'] as const;

const auditCols = {
  created_at: z.number(),
  created_by: z.number(),
  updated_at: z.number(),
  updated_by: z.number(),
}

export const UserDbSchema = z.object({
  id: z.number(),
  name: z.string(),
  // role: z.enum(roles),
  // username: z.string().max(20),
  // email: z.string().max(80),
  // salt: z.string().max(32),
  // encrypted_password: z.string().max(64),
  // ...auditCols
});

export const UserDbDetails = z.object({
  role: z.enum(roles),
  username: z.string().max(20),
  email: z.string().max(80),
  salt: z.string().max(32),
  encrypted_password: z.string().max(64),
});

export const UserSchema = UserDbSchema.transform(
  // ({ encrypted_password, ...rest }) => ({
  //   ...rest,
  //   // map db names to runtime names
  //   encryptedPassword: encrypted_password,
  // })
  ({ ...rest }) => ({
    ...rest,
  })
);

export const UserDetailsSchema = UserDbDetails.transform(
  ({ encrypted_password, ...rest }) => ({
    ...rest,
    // map db names to runtime names
    encryptedPassword: encrypted_password,
  })
);

export type UserDetails = z.infer<typeof UserDetailsSchema>;

export type User = z.infer<typeof UserSchema>;
