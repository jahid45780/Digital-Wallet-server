import { Types } from "mongoose";

export type TWalletStatus = "active" | "blocked";

export interface TWallet {
  user: Types.ObjectId;
  balance: number;
  status: TWalletStatus;
}