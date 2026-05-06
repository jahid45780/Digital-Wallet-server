import mongoose from "mongoose";
import { Wallet } from "../wallet/wallet.model";
import AppError from "../../errorHerplrs/appError";
import { TWalletStatus } from "../wallet/wallet.interface";
import { Transaction } from "./transaction.model";
import { User } from "../user/user.model";
import { Role } from "../user/user.interface";


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

// send MONEY
const sendMoney = async (senderId:string, receiverId:string, amount:number)=>{

  const session = await mongoose.startSession();

  try {
    session.startTransaction()

    if(senderId === receiverId){
      throw new  AppError(400, "con  not  send  money to yourself")

    }

    const senderWallet = await Wallet.findOne({user:senderId}).session(session);
 
    const receiverWallet = await Wallet.findOne({user:receiverId}).session(session);

    if(!senderWallet || !receiverWallet){
       throw new AppError(404, "Wallet not found")
    }

   

    if(senderWallet.status === TWalletStatus.BLOCKED){
      throw new AppError (403, "Sender  wallet blocked")
    }

    if(receiverWallet.status === TWalletStatus.BLOCKED){
      throw new AppError(403, "Receiver wallet blocked")
    }

    const sendFee = 2;

    const totalAmount  = amount + sendFee;

    if(senderWallet.balance < totalAmount){
      throw new  AppError (400, "Insufficient balance")
    }

    senderWallet.balance -= totalAmount;
    receiverWallet.balance +=amount;
  
    await senderWallet.save({session});
    await receiverWallet.save({session});
    

    await Transaction.create([
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
    ],
     {session}
  );

  await session.commitTransaction()

  return {
    senderWallet,
    receiverWallet
  };

  } catch (error) {
     await session.abortTransaction();

     throw(error)
  } finally{
    session.endSession();
  }

}



// cash in
const cashIn = async (
  agentId: string,
  userId: string,
  amount: number
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const agent = await User.findById(agentId);

    if (!agent) {
      throw new AppError(404, "Agent not found");
    }

    if (agent.role !== Role.AGENT) {
      throw new AppError(
        403,
        "Only agent can cash in"
      );
    }

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

    const commission = amount * 0.01;

    await Transaction.create(
      [
        {
          type: "CASH_IN",
          toWallet: wallet._id,
          amount,
          fee: 0,
          commission,
          status: "SUCCESS",
          initiatedBy: agentId,
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

// cash out
const cashOut = async (
  agentId: string,
  userId: string,
  amount: number
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const agent = await User.findById(agentId);

    if (!agent) {
      throw new AppError(404, "Agent not found");
    }

    if (agent.role !== Role.AGENT) {
      throw new AppError(
        403,
        "Only agent can cash out"
      );
    }

    const wallet = await Wallet.findOne({
      user: userId,
    }).session(session);

    if (!wallet) {
      throw new AppError(404, "Wallet not found");
    }

    if (wallet.status === TWalletStatus.BLOCKED) {
      throw new AppError(403, "Wallet blocked");
    }

    if (wallet.balance < amount) {
      throw new AppError(
        400,
        "Insufficient balance"
      );
    }

    wallet.balance -= amount;

    await wallet.save({ session });

    const commission = amount * 0.01;

    await Transaction.create(
      [
        {
          type: "CASH_OUT",
          fromWallet: wallet._id,
          amount,
          fee: 0,
          commission,
          status: "SUCCESS",
          initiatedBy: agentId,
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

// my transaction history
const myTransactions = async (
  userId: string
) => {
  const wallet = await Wallet.findOne({
    user: userId,
  });

  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }

  const transactions = await Transaction.find({
    $or: [
      { fromWallet: wallet._id },
      { toWallet: wallet._id },
    ],
  })
    .populate("fromWallet")
    .populate("toWallet")
    .sort({ createdAt: -1 });

    const totalTransaction = await Transaction.countDocuments()

  return{
        data:transactions,
        meta:{
            total:totalTransaction
        }
    }
};



// admin all transactions
const getAllTransactions = async () => {
  const transactions = await Transaction.find()
    .populate("initiatedBy")
    .populate("fromWallet")
    .populate("toWallet")
    .sort({ createdAt: -1 });

    const totaltTransactions = await Transaction.countDocuments()

  return{
    data:transactions,
    meta:{
      total:totaltTransactions
    }
  };
};





export const transactionService = {
     addMoney,
     withdraw,
     sendMoney,
     cashIn,
     cashOut,
     myTransactions,
     getAllTransactions
}