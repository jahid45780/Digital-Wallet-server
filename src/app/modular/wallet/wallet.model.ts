import { model, Schema } from "mongoose";
import { TWallet } from "./wallet.interface";


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
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Wallet = model<TWallet>("Wallet", walletSchema);