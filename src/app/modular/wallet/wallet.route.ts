import { Router } from "express";
import { walletController } from "./wallet.controller";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { blockWalletZodSchema } from "./wallet.validation";


const router = Router()


router.get("/me", checkAuth(Role.USER,Role.AGENT), walletController.getMyWallet)

router.post("/all-wallets", checkAuth(Role.ADMIN),
walletController.getAllWallets)

router.patch("/block/:walletId",
  
checkAuth(Role.ADMIN), walletController.blockWallet)

router.patch("/unblock/:walletId",
    checkAuth(Role.ADMIN),
  walletController.unblockWallet)

export const walletRouter = router