import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/add-money", 
 checkAuth(Role.USER),
transactionController.addMoney)

router.post("/withdraw",
    checkAuth(Role.USER),
    transactionController.withdraw)

router.post("/send-money",
    checkAuth(Role.USER),
    transactionController.sendMoney)

router.post("/cash-in", 
        checkAuth(Role.AGENT),
        transactionController.cashIn)

 router.post("/cash-out", 
    checkAuth(Role.AGENT),
    transactionController.cashOut)

router.get("/me", 
checkAuth(Role.USER, Role.AGENT),    
transactionController.myTransactions)

router.get("/all-transactions", checkAuth(Role.ADMIN), transactionController.getAllTransactions)

export const  transactionRouter =router; 