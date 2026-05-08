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
exports.transactionService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wallet_model_1 = require("../wallet/wallet.model");
const appError_1 = __importDefault(require("../../errorHerplrs/appError"));
const wallet_interface_1 = require("../wallet/wallet.interface");
const transaction_model_1 = require("./transaction.model");
const user_model_1 = require("../user/user.model");
const user_interface_1 = require("../user/user.interface");
// add money
const addMoney = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const wallet = yield wallet_model_1.Wallet.findOne({
            user: userId,
        }).session(session);
        if (!wallet) {
            throw new appError_1.default(404, "Wallet not found");
        }
        if (wallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Wallet blocked");
        }
        wallet.balance += amount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: "ADD-MONEY",
                toWallet: wallet._id,
                amount,
                fee: 0,
                commission: 0,
                status: "SUCCESS",
                initiatedBy: userId,
            },
        ], { session });
        yield session.commitTransaction();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// withdraw
const withdraw = (userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const wallet = yield wallet_model_1.Wallet.findOne({
            user: userId,
        }).session(session);
        if (!wallet) {
            throw new appError_1.default(404, "Wallet not found");
        }
        if (wallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Wallet blocked");
        }
        const withdrawFee = 5;
        const totalAmount = amount + withdrawFee;
        if (wallet.balance < totalAmount) {
            throw new appError_1.default(400, "Insufficient balance");
        }
        wallet.balance -= totalAmount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: "WITHDRAW",
                fromWallet: wallet._id,
                amount,
                fee: withdrawFee,
                commission: 0,
                status: "SUCCESS",
                initiatedBy: userId,
            },
        ], { session });
        yield session.commitTransaction();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// send MONEY
const sendMoney = (senderId, receiverId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (senderId === receiverId) {
            throw new appError_1.default(400, "con  not  send  money to yourself");
        }
        const senderWallet = yield wallet_model_1.Wallet.findOne({ user: senderId }).session(session);
        const receiverWallet = yield wallet_model_1.Wallet.findOne({ user: receiverId }).session(session);
        if (!senderWallet || !receiverWallet) {
            throw new appError_1.default(404, "Wallet not found");
        }
        if (senderWallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Sender  wallet blocked");
        }
        if (receiverWallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Receiver wallet blocked");
        }
        const sendFee = 2;
        const totalAmount = amount + sendFee;
        if (senderWallet.balance < totalAmount) {
            throw new appError_1.default(400, "Insufficient balance");
        }
        senderWallet.balance -= totalAmount;
        receiverWallet.balance += amount;
        yield senderWallet.save({ session });
        yield receiverWallet.save({ session });
        yield transaction_model_1.Transaction.create([
            {
                type: "ADD-MONEY",
                fromWallet: senderWallet._id,
                toWallet: receiverWallet._id,
                amount,
                fee: sendFee,
                commission: 0,
                status: "SUCCESS",
                initiatedBy: senderId,
            }
        ], { session });
        yield session.commitTransaction();
        return {
            senderWallet,
            receiverWallet
        };
    }
    catch (error) {
        yield session.abortTransaction();
        throw (error);
    }
    finally {
        session.endSession();
    }
});
// cash in
const cashIn = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const agent = yield user_model_1.User.findById(agentId);
        if (!agent) {
            throw new appError_1.default(404, "Agent not found");
        }
        if (agent.role !== user_interface_1.Role.AGENT) {
            throw new appError_1.default(403, "Only agent can cash in");
        }
        const wallet = yield wallet_model_1.Wallet.findOne({
            user: userId,
        }).session(session);
        if (!wallet) {
            throw new appError_1.default(404, "Wallet not found");
        }
        if (wallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Wallet blocked");
        }
        wallet.balance += amount;
        yield wallet.save({ session });
        const commission = amount * 0.01;
        yield transaction_model_1.Transaction.create([
            {
                type: "CASH_IN",
                toWallet: wallet._id,
                amount,
                fee: 0,
                commission,
                status: "SUCCESS",
                initiatedBy: agentId,
            },
        ], { session });
        yield session.commitTransaction();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// cash out
const cashOut = (agentId, userId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const agent = yield user_model_1.User.findById(agentId);
        if (!agent) {
            throw new appError_1.default(404, "Agent not found");
        }
        if (agent.role !== user_interface_1.Role.AGENT) {
            throw new appError_1.default(403, "Only agent can cash out");
        }
        const wallet = yield wallet_model_1.Wallet.findOne({
            user: userId,
        }).session(session);
        if (!wallet) {
            throw new appError_1.default(404, "Wallet not found");
        }
        if (wallet.status === wallet_interface_1.TWalletStatus.BLOCKED) {
            throw new appError_1.default(403, "Wallet blocked");
        }
        if (wallet.balance < amount) {
            throw new appError_1.default(400, "Insufficient balance");
        }
        wallet.balance -= amount;
        yield wallet.save({ session });
        const commission = amount * 0.01;
        yield transaction_model_1.Transaction.create([
            {
                type: "CASH_OUT",
                fromWallet: wallet._id,
                amount,
                fee: 0,
                commission,
                status: "SUCCESS",
                initiatedBy: agentId,
            },
        ], { session });
        yield session.commitTransaction();
        return wallet;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
// my transaction history
const myTransactions = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({
        user: userId,
    });
    if (!wallet) {
        throw new appError_1.default(404, "Wallet not found");
    }
    const transactions = yield transaction_model_1.Transaction.find({
        $or: [
            { fromWallet: wallet._id },
            { toWallet: wallet._id },
        ],
    })
        .populate("fromWallet")
        .populate("toWallet")
        .sort({ createdAt: -1 });
    const totalTransaction = yield transaction_model_1.Transaction.countDocuments();
    return {
        data: transactions,
        meta: {
            total: totalTransaction
        }
    };
});
// admin all transactions
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find()
        .populate("initiatedBy")
        .populate("fromWallet")
        .populate("toWallet")
        .sort({ createdAt: -1 });
    const totaltTransactions = yield transaction_model_1.Transaction.countDocuments();
    return {
        data: transactions,
        meta: {
            total: totaltTransactions
        }
    };
});
exports.transactionService = {
    addMoney,
    withdraw,
    sendMoney,
    cashIn,
    cashOut,
    myTransactions,
    getAllTransactions
};
