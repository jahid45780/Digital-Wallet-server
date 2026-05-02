import { z } from "zod";

export const blockWalletZodSchema = z.object({
  params: z.object({
    walletId: z.string(),
  }),
});