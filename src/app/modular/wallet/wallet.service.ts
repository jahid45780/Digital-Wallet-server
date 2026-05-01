import mongoose from "mongoose"
import AppError from "../../errorHerplrs/appError"
import { Wallet } from "./wallet.model"



const getMyWallet = async (userId:string)=>{
    const result = await Wallet.findOne({user:userId})

    if(!result){
        throw new AppError(404, "Wallet not found")
    }

    return result
}

const addMoney = async (userId:string, amount:number)=>{
    const wallet = await Wallet.findOne({user:userId});

    if(!wallet){
        throw new AppError(404, "Wallet not found" )
    }

    wallet.balance += amount;

    await wallet.save();

    return wallet;
}


const withdraw = async(userId:string, amount:number)=>{
    const wallet = await Wallet.findOne({user:userId})

    if(!wallet){
        throw new AppError(404, "wallet not  found")
    }

    if(wallet.balance < amount){
        throw new AppError(400, "Insufficient balance")
    }

    wallet.balance -= amount;
    await wallet.save();
    return wallet;

}

// const  sendMoney = async (
//     senderId:string,
//     receiverId:string,
//     amount:number
// ) =>{
//     const senderWallet = await Wallet.findOne({user:senderId});
//     const receiverWallet = await Wallet.findOne({user:receiverId});

//     if(!senderWallet || !receiverWallet){
//         throw new AppError(404, "wallet not  found")
//     }

//     if(senderWallet.balance < amount){
//         throw new  AppError(400, "Insufficient balance")
//     }

//     senderWallet.balance -= amount;
//     receiverWallet.balance += amount;

//     await senderWallet.save();
//     await receiverWallet.save();

//     return{
//         senderWallet,
//         receiverWallet
//     }

// }

const sendMoney = async (
  senderId: string,
  receiverId: string,
  amount: number
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

 
    const senderWallet = await Wallet.findOne({ user: senderId }).session(session);
    const receiverWallet = await Wallet.findOne({ user: receiverId }).session(session);


    if (!senderWallet || !receiverWallet) {
      throw new AppError(404, "Wallet not found");
    }

    if (amount <= 0) {
      throw new AppError(400, "Invalid amount");
    }


    if (senderWallet.balance < amount) {
      throw new AppError(400, "Insufficient balance");
    }

   
    senderWallet.balance -= amount;
    receiverWallet.balance += amount;

 
    await senderWallet.save({ session });
    await receiverWallet.save({ session });

  
    await session.commitTransaction();

    return {
      senderWallet,
      receiverWallet,
    };

  } catch (error) {
   
    await session.abortTransaction();
    throw error;

  } finally {
  
    session.endSession();
  }
};

export const walletService ={
    getMyWallet,
    addMoney,
    withdraw,
    sendMoney
}