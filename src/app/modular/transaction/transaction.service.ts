import mongoose from "mongoose";
import { Wallet } from "../wallet/wallet.model";
import AppError from "../../errorHerplrs/appError";
import { TWalletStatus } from "../wallet/wallet.interface";
import { Transaction } from "./transaction.model";


// add money
const addMoney = async (userId: string, amount: number) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const wallet = await Wallet.findOne({
      user: userId,
    }).session(session);

    if (!wallet) {
      throw new AppError(404, "Wallet not found");
    }

    if (wallet.status === TWalletStatus.BLOCKED) {
      throw new AppError(403, "Wallet blocked");
    }

    wallet.balance += amount;

    await wallet.save({ session });

    await Transaction.create(
      [
        {
          type: "ADD-MONEY",
          toWallet: wallet._id,
          amount,
          fee: 0,
          commission: 0,
          status: "SUCCESS",
          initiatedBy: userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return wallet;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};


// withdraw
const withdraw = async (userId: string, amount: number) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const wallet = await Wallet.findOne({
      user: userId,
    }).session(session);

    if (!wallet) {
      throw new AppError(404, "Wallet not found");
    }

    if (wallet.status === TWalletStatus.BLOCKED) {
      throw new AppError(403, "Wallet blocked");
    }

    const withdrawFee = 5;

    const totalAmount = amount + withdrawFee;

    if (wallet.balance < totalAmount) {
      throw new AppError(400, "Insufficient balance");
    }

    wallet.balance -= totalAmount;

    await wallet.save({ session });

    await Transaction.create(
      [
        {
          type: "WITHDRAW",
          fromWallet: wallet._id,
          amount,
          fee: withdrawFee,
          commission: 0,
          status: "SUCCESS",
          initiatedBy: userId,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    return wallet;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const transactionService = {
     addMoney,
     withdraw
}