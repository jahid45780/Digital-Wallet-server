import { Types } from "mongoose";

// export type TWalletStatus = "active" | "blocked";

export enum TWalletStatus {
     ACTIVE = "ACTIVE",
     BLOCKED = "BLOCKED"
}

export interface TWallet {
  user: Types.ObjectId;
  balance: number;
  status:TWalletStatus;
}