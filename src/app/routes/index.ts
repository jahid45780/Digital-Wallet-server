import { Router } from "express";
import { userRouter } from "../modular/user/user.route";
import { authRouter } from "../modular/auth/auth.route";
import { walletRouter } from "../modular/wallet/wallet.route";
import { transactionRouter } from "../modular/transaction/transaction.route";

 export const router = Router()

 const moduleRouter = [
    {
     path:"/user",
     route:userRouter
    },
    {
      path:"/auth",
      route:authRouter
    },
    {
      path:"/wallet",
      route:walletRouter
    },
    {
      path:"/transaction",
      route:transactionRouter
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })

