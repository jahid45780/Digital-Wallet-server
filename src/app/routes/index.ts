import { Router } from "express";
import { userRouter } from "../modular/user/user.route";
import { authRouter } from "../modular/auth/auth.route";
import { walletRouter } from "../modular/wallet/wallet.route";
import { transactionRouter } from "../modular/transaction/transaction.route";
import { adminRouter } from "../modular/admin/admin.route";
import { OtpRoutes } from "../modular/opt/otp.route";

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
    route:adminRouter},

     { path:"/otp",
    route:OtpRoutes}
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })

