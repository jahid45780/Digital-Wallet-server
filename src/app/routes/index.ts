import { Router } from "express";
import { userRouter } from "../modular/user/user.route";

 export const router = Router()

 const moduleRouter = [
    {
     path:"/user",
     route:userRouter
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path, route.route)
 })

