import { Router } from "express";
import { walletController } from "./wallet.controller";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { amountZodSchema, sendMoneyZodSchema } from "./wallet.validation";

const router = Router()


router.get("/me", checkAuth(Role.USER,Role.AGENT), walletController.getMyWallet)
router.post("/add-money", checkAuth(...Object.values(Role)),
 validateRequest(amountZodSchema),
walletController.addMoney)

router.post("/withdraw", 
validateRequest(amountZodSchema),    
checkAuth(...Object.values(Role)), walletController.withdraw)

router.post("/send-money",
    checkAuth(...Object.values(Role)),
    validateRequest(sendMoneyZodSchema),
    walletController.sendMoney)

export const walletRouter = router