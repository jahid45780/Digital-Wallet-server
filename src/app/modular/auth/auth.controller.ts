import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import  httpStatue  from "http-status-codes";
import AppError from "../../errorHerplrs/appError";
import { createUserToken } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { sentResponse } from "../../utils/sentResponse";


const credentialsLogin = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     passport.authenticate("local",async(err:any, user:any, info:any)=>{
          if(err){
            return next(new AppError (401, err) )
          }

          if(!user){
            return next(new AppError (401, info.message))
          }

          const userTokens = await createUserToken(user)

          const {password, ...userData} = user.toObject()

          await setAuthCookie(res, userTokens)

          sentResponse(res, {
      success: true,
      statusCode: httpStatue.OK,
      message: "Successfully logged in user",
      data: {
        accessTokens: userTokens.accessToken,
        refreshTokens: userTokens.refreshToken,
        user: userData
      }
    });

     })(req, res, next)
})

 export const authController = {
    credentialsLogin
 }