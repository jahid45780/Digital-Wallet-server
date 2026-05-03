
import { Types } from "mongoose";

export enum TTransactionType {
  ADD_MONEY = "ADD-MONEY",
  WITHDRAW = "WITHDRAW",
  SEND_MONEY = "SEND_MONEY",
  CASH_IN = "CASH_IN",
  CASH_OUT = "CASH_OUT",
}


export enum TTransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface TTransaction {
  type: TTransactionType;

  fromWallet?: Types.ObjectId;

  toWallet?: Types.ObjectId;

  amount: number;

  fee: number;

  commission: number;

  status: TTransactionStatus;

  initiatedBy: Types.ObjectId;
}