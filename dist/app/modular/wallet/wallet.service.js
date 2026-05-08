"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = void 0;
const appError_1 = __importDefault(require("../../errorHerplrs/appError"));
const wallet_model_1 = require("./wallet.model");
const wallet_interface_1 = require("./wallet.interface");
// get my wallet
const getMyWallet = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({
        user: userId,
    }).populate("user");
    if (!wallet) {
        throw new appError_1.default(404, "Wallet not found");
    }
    return wallet;
});
// get all wallets (admin)
const getAllWallets = () => __awaiter(void 0, void 0, void 0, function* () {
    const wallets = yield wallet_model_1.Wallet.find()
        .populate("user")
        .sort({ createdAt: -1 });
    const totalWallet = yield wallet_model_1.Wallet.countDocuments();
    return {
        data: wallets,
        meta: {
            total: totalWallet
        }
    };
});
// block wallet
const blockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new appError_1.default(404, "Wallet not found");
    }
    if (wallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
        throw new appError_1.default(400, "Wallet already blocked");
    }
    wallet.status = wallet_interface_1.TWalletStatus.BLOCKED;
    yield wallet.save();
    return wallet;
});
const unblockWallet = (walletId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findById(walletId);
    if (!wallet) {
        throw new appError_1.default(404, "wallet not found");
    }
    if (wallet.status === wallet_interface_1.TWalletStatus.ACTIVE) {
        throw new appError_1.default(400, "Wallet already Active");
    }
    wallet.status = wallet_interface_1.TWalletStatus.ACTIVE;
    yield wallet.save();
    return wallet;
});
exports.walletService = {
    getMyWallet,
    getAllWallets,
    blockWallet,
    unblockWallet
};
