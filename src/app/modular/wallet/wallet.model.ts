import { Schema, model } from "mongoose";
import { TWallet, TWalletStatus } from "./wallet.interface";

const walletSchema = new Schema<TWallet>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 50,
      min: 0,
    },

    status: {
      type: String,
      enum: Object.values(TWalletStatus),
      default:TWalletStatus.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
);

export const Wallet = model<TWallet>(
  "Wallet",
  walletSchema
);