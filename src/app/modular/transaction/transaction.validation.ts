import { z } from "zod";

export const amountZodSchema = z.object({
  body: z.object({
    amount: z.number().positive(),
  }),
});

export const sendMoneyZodSchema = z.object({
  body: z.object({
    receiverId: z.string(),
    amount: z.number().positive(),
  }),
});

export const cashInOutZodSchema = z.object({
  body: z.object({
    userId: z.string(),
    amount: z.number().positive(),
  }),
});