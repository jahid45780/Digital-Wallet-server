import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/add-money", 
 checkAuth(Role.USER),
transactionController.addMoney)


export const  transactionRouter =router; 