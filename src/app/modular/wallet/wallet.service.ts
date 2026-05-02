import mongoose from "mongoose"
import AppError from "../../errorHerplrs/appError"
import { Wallet } from "./wallet.model"
import { TWalletStatus } from "./wallet.interface";



// get my wallet
const getMyWallet = async (userId: string) => {
  const wallet = await Wallet.findOne({
    user: userId,
  }).populate("user");

  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }

  return wallet;
};

// get all wallets (admin)
const getAllWallets = async () => {
  const wallets = await Wallet.find()
    .populate("user")
    .sort({ createdAt: -1 });

    const totalWallet = await Wallet.countDocuments()

  return {
    data:wallets,
    meta:{
      total:totalWallet
    }
  };
};


// block wallet
const blockWallet = async (walletId: string) => {
  const wallet = await Wallet.findById(walletId);

  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }

  if (wallet.status === TWalletStatus.BLOCKED) {
    throw new AppError(
      400,
      "Wallet already blocked"
    );
  }

  wallet.status = TWalletStatus.BLOCKED;

  await wallet.save();

  return wallet;
};

const unblockWallet = async (walletId:string)=>{
     const wallet = await Wallet.findById(walletId)

     if(!wallet){
      throw new AppError(404,"wallet not found")
     }

     if(wallet.status === TWalletStatus.ACTIVE){
        throw new AppError(400,"Wallet already Active")
     }

     wallet.status = TWalletStatus.ACTIVE;
     await wallet.save();

     return wallet;
}

export const walletService ={
    getMyWallet,
    getAllWallets,
    blockWallet,
    unblockWallet
}