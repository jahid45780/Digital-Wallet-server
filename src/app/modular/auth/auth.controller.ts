import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import  httpStatue  from "http-status-codes";
import AppError from "../../errorHerplrs/appError";
import { createUserToken } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { sentResponse } from "../../utils/sentResponse";
import { authService } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";
import { envVers } from "../../config/env";
import { Role } from "../user/user.interface";




const credentialsLogin = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     passport.authenticate("local",async(err:any, user:any, info:any)=>{
          if(err){
            return next(new AppError (401, err) )
          }

          if(!user){
            return next(new AppError (401, info.message))
          }

          if(user.role === Role.AGENT && !user.isApproved){
   throw new AppError(403,"Agent not approved")
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


const getNewAccessToken = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
  
  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    throw new AppError(httpStatue.BAD_REQUEST, "Refresh token not found")
  }

  const tokenInfo = await authService.getNewAccessToken(refreshToken as string)

  setAuthCookie(res, tokenInfo)

   sentResponse(res,{
    success:true,
    statusCode:httpStatue.OK,
    message:"Successfully generated new access token",
    data:tokenInfo
   
  })

})

const logout = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  
  res.clearCookie("accessToken",{
     httpOnly:true,
     secure:false,
     sameSite:"lax"
  })

  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    sameSite:"lax"
  })

    sentResponse(res,{
    success:true,
    statusCode:httpStatue.OK,
    message:"successfully  logged out user",
    data:null
   
  })

})

const resetPassword = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{

    const decodedToken = req.user;
    await authService.resetPassword(req.body, decodedToken as JwtPayload)

    sentResponse(res,{
    success:true,
    statusCode:httpStatue.OK,
    message:" password  reset successfully",
    data:null
   
  })

})


const googleCallbackController = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

   let redirectTo = req.query.state ? req.query.state as string : ""

   if(redirectTo.startsWith("/")){
    redirectTo = redirectTo.slice(1)
   }

    const user = req.user;
    
    if(!user){
      throw new AppError(404, "user  not  found")
    }

    const TokenInfo = createUserToken(user)

    setAuthCookie(res, TokenInfo)

    res.redirect(`${envVers.FRONTEND_URL}/${redirectTo}`)

})


 export const authController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
 } 