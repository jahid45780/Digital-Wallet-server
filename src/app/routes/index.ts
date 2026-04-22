import { Router } from "express";
import { userRouter } from "../modular/user/user.route";
import { authRouter } from "../modular/auth/auth.route";

 export const router = Router()

 const moduleRouter = [
    {
     path:"/user",
     route:userRouter
    },
    {
      path:"/auth",
      route:authRouter
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })

