import { Schema, model } from "mongoose";
import { TTransaction, TTransactionStatus, TTransactionType } from "./transaction.interface";



const transactionSchema = new Schema<TTransaction>(
  {
    type: {
      type: String,
      enum:Object.values(TTransactionType) ,
      required: true,
    },

    fromWallet: {
      type: Schema.Types.ObjectId,
      ref: "Wallet",
    },

    toWallet: {
      type: Schema.Types.ObjectId,
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
      type:String,
      enum:Object.values(TTransactionStatus) ,
      default:TTransactionStatus.SUCCESS,
    },

    initiatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model<TTransaction>(
  "Transaction",
  transactionSchema
);