"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ message: "Name must be string" })
            .min(2, { message: "Name must be at least 2 characters long" })
            .max(50, { message: "Name cannot exceed 50 characters" }),
        email: zod_1.z
            .string({ error: "Email must be string" })
            .email({ message: "Invalid email address format" })
            .min(5)
            .max(100),
        password: zod_1.z
            .string({ error: "Password must be string" })
            .min(8)
            .regex(/^(?=.*[A-Z])/)
            .regex(/^(?=.*[!@#$%^&*])/)
            .regex(/^(?=.*\d)/),
        phone: zod_1.z
            .string()
            .regex(/^(?:\+8801\d{9}|01\d{9})$/)
            .optional(),
        address: zod_1.z.string().max(200).optional(),
        role: zod_1.z.nativeEnum(user_interface_1.Role).default(user_interface_1.Role.USER),
    }),
});
exports.updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(50).optional(),
        password: zod_1.z
            .string()
            .min(8)
            .regex(/^(?=.*[A-Z])/)
            .regex(/^(?=.*[!@#$%^&*])/)
            .regex(/^(?=.*\d)/)
            .optional(),
        phone: zod_1.z
            .string()
            .regex(/^(?:\+8801\d{9}|01\d{9})$/)
            .optional(),
        address: zod_1.z.string().max(200).optional(),
        role: zod_1.z.nativeEnum(user_interface_1.Role).optional(),
        isActive: zod_1.z.nativeEnum(user_interface_1.isActive).optional(),
        IsDeleted: zod_1.z.boolean().optional(),
        IsVerified: zod_1.z.boolean().optional(),
    }),
});
