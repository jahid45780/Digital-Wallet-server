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
exports.transactionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sentResponse_1 = require("../../utils/sentResponse");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transaction_service_1 = require("./transaction.service");
const appError_1 = __importDefault(require("../../errorHerplrs/appError"));
const addMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.addMoney(userId, req.body.amount);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Money added successfully",
        data: result
    });
}));
const withdraw = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.withdraw(userId, req.body.amount);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Withdraw successful",
        data: result,
    });
}));
const sendMoney = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.sendMoney(userId, req.body.receiverId, req.body.amount);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Money sent successfully",
        data: result,
    });
}));
const cashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.cashIn(userId, req.body.userId, req.body.amount);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Cash in successful",
        data: result,
    });
}));
const cashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.cashOut(userId, req.body.userId, req.body.amount);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Cash out successful",
        data: result,
    });
}));
const myTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    if (!userId) {
        throw new appError_1.default(401, "Unauthorized");
    }
    const result = yield transaction_service_1.transactionService.myTransactions(userId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Transactions fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getAllTransactions = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transaction_service_1.transactionService.getAllTransactions();
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All transactions fetched successfully",
        meta: result.meta,
        data: result.data,
    });
}));
exports.transactionController = {
    addMoney,
    withdraw,
    sendMoney,
    cashIn,
    cashOut,
    myTransactions,
    getAllTransactions
};
