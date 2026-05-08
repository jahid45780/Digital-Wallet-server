"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(transaction_interface_1.TTransactionType),
        required: true,
    },
    fromWallet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Wallet",
    },
    toWallet: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Wallet",
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
    },
    fee: {
        type: Number,
        default: 0,
    },
    commission: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: Object.values(transaction_interface_1.TTransactionStatus),
        default: transaction_interface_1.TTransactionStatus.SUCCESS,
    },
    initiatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
