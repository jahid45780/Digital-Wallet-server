import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sentResponse } from "../../utils/sentResponse";


const createUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const payload = req.body;

    const user = await userService.createUser(payload)

     sentResponse(res,{
      success:true,
      statusCode:httpStatus.CREATED,
      message:"successfully create user",
      data:user

    })

})

const updateUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
     const {id} = req.params
     const payload = req.body;

     const updatedUser = await userService.updateUser(id as string , payload)  

     sentResponse(res,{
      success:true,
      statusCode:httpStatus.OK,
      message:"successfully updated user",
      data:updatedUser

    })
})

 export const userController = {
    createUser,
    updateUser
 }