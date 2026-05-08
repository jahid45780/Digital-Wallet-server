"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashInOutZodSchema = exports.sendMoneyZodSchema = exports.amountZodSchema = void 0;
const zod_1 = require("zod");
exports.amountZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive(),
    }),
});
exports.sendMoneyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        receiverId: zod_1.z.string(),
        amount: zod_1.z.number().positive(),
    }),
});
exports.cashInOutZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string(),
        amount: zod_1.z.number().positive(),
    }),
});
