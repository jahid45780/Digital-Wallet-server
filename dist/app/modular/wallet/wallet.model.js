"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const wallet_interface_1 = require("./wallet.interface");
const walletSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 50,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(wallet_interface_1.TWalletStatus),
        default: wallet_interface_1.TWalletStatus.ACTIVE,
    },
}, {
    timestamps: true,
});
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
