import { Router } from "express";
import { userRouter } from "../modular/user/user.route";
import { authRouter } from "../modular/auth/auth.route";
import { walletRouter } from "../modular/wallet/wallet.route";
import { transactionRouter } from "../modular/transaction/transaction.route";
import { adminRouter } from "../modular/admin/admin.route";

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
    },
   { path:"/admin",
    route:adminRouter}
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })

