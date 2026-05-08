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
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const wallet_service_1 = require("./wallet.service");
const sentResponse_1 = require("../../utils/sentResponse");
const getMyWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.walletService.getMyWallet(req.user.userId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Wallet fetched successfully",
        data: result,
    });
}));
const getAllWallets = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.walletService.getAllWallets();
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All wallets fetched successfully",
        meta: result.meta,
        data: result,
    });
}));
const blockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.walletService.blockWallet(req.params.walletId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: " successful block Wallet ",
        data: result
    });
}));
const unblockWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wallet_service_1.walletService.unblockWallet(req.params.walletId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "successfully unblock wallet",
        data: result,
    });
}));
exports.walletController = {
    getMyWallet,
    getAllWallets,
    blockWallet,
    unblockWallet
};
