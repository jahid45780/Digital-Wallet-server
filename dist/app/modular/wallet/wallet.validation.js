"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockWalletZodSchema = void 0;
const zod_1 = require("zod");
exports.blockWalletZodSchema = zod_1.z.object({
    params: zod_1.z.object({
        walletId: zod_1.z.string(),
    }),
});
