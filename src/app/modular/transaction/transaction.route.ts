import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { amountZodSchema, cashInOutZodSchema, sendMoneyZodSchema } from "./transaction.validation";

const router = Router()

router.post("/add-money", 
 checkAuth(Role.USER),
 validateRequest(amountZodSchema),
transactionController.addMoney)

router.post("/withdraw",
    checkAuth(Role.USER),
    validateRequest(amountZodSchema),
    transactionController.withdraw)

router.post("/send-money",
    checkAuth(Role.USER),
    validateRequest(sendMoneyZodSchema),
    transactionController.sendMoney)

router.post("/cash-in", 
        checkAuth(Role.AGENT),
        validateRequest(cashInOutZodSchema),
        transactionController.cashIn)

 router.post("/cash-out", 
    checkAuth(Role.AGENT),
    validateRequest(cashInOutZodSchema),
    transactionController.cashOut)

router.get("/me", 
checkAuth(Role.USER, Role.AGENT),    
transactionController.myTransactions)

router.get("/all-transactions", checkAuth(Role.ADMIN), transactionController.getAllTransactions)

export const  transactionRouter =router; 