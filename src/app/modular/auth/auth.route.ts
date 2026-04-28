import { NextFunction, Request, Response, Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "./authCheck";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = Router()

router.post("/login", authController.credentialsLogin)
router.post("/refresh-token", authController.getNewAccessToken)
router.post("/logOut", authController.logout)
router.post("/reset-password", checkAuth(...Object.values(Role)), authController.resetPassword)


router.get("/google", (req:Request, res:Response, next:NextFunction)=>{
    const redirect = req.query.redirect || "/";

    passport.authenticate("google",{
        scope:["Profile", "email"],
        state:redirect as string
    })(req, res, next)
})

router.get("/google/callback", passport.authenticate("google",{failureRedirect:"/login"}), authController.googleCallbackController)


export const authRouter = router