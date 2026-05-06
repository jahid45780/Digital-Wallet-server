import {z }from "zod";
import { isActive, Role } from "./user.interface";

 
export const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "Name must be string" })
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name cannot exceed 50 characters" }),

    email: z
      .string({ error: "Email must be string" })
      .email({ message: "Invalid email address format" })
      .min(5)
      .max(100),

    password: z
      .string({ error: "Password must be string" })
      .min(8)
      .regex(/^(?=.*[A-Z])/)
      .regex(/^(?=.*[!@#$%^&*])/)
      .regex(/^(?=.*\d)/),

    phone: z
      .string()
      .regex(/^(?:\+8801\d{9}|01\d{9})$/)
      .optional(),

    address: z.string().max(200).optional(),

    role: z.nativeEnum(Role).default(Role.USER),
  }),
});



export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).optional(),

    password: z
      .string()
      .min(8)
      .regex(/^(?=.*[A-Z])/)
      .regex(/^(?=.*[!@#$%^&*])/)
      .regex(/^(?=.*\d)/)
      .optional(),

    phone: z
      .string()
      .regex(/^(?:\+8801\d{9}|01\d{9})$/)
      .optional(),

    address: z.string().max(200).optional(),

    role: z.nativeEnum(Role).optional(),

    isActive: z.nativeEnum(isActive).optional(),

    IsDeleted: z.boolean().optional(),
    IsVerified: z.boolean().optional(),
  }),
});
