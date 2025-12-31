import { z } from "zod";

const password = z
  .string()
  .nonempty()
  .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

export const loginSchema = z.object({
  email: z.email(),
  password,
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  displayName: z.string().min(2).max(35),
  email: z.email(),
  password,
});

export type RegisterInput = z.infer<typeof registerSchema>;
