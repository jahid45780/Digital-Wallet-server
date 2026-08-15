import { NextFunction, Request, Response } from "express";
import AppError from "../../errorHerplrs/appError";
import { verifyToken } from "../../utils/jwt";
import { envVers } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import { isActive } from "../user/user.interface";

export const checkAuth = ((...authRoles:string[])=> async (req:Request, res:Response, next:NextFunction)=>{
     try {
        const accessToken =  req.cookies.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

        if(!accessToken){
            throw new AppError(401, "Not received token")
        }

        const verifiedToken = verifyToken(accessToken, envVers.JWT_ACCESS_SECRET) as JwtPayload;

        const isUserExist = await User.findOne({email:verifiedToken.email})

        if(!isUserExist){
            throw new AppError(400, "user dose not  exist")
        }

        if(isUserExist.IsActive === isActive.BLOCKED || isUserExist.IsActive === isActive.INACTIVE ){
                 throw new AppError(400, `user is ${isUserExist.IsActive}`)
             }

             
              if(isUserExist.IsDeleted){
                 throw new AppError(400, "user is deleted")
             }

             if(!authRoles.includes(verifiedToken.role)){
        throw new AppError(403, "you not permitted to view this  route")
    }
    
     req.user =verifiedToken

     next()

     } catch (error) {
        next(error)
     }
})