import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sentResponse } from "../../utils/sentResponse";
import { JwtPayload } from "jsonwebtoken";
import { get } from "node:http";


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

const getUsers = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  const result = await userService.getUsers();

   sentResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"successfully get all-users",
    meta: result.meta,
    data:result.data
   
  })
})

const getSingleUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id;
  
    const result = await userService.getSingleUser(id as string)

      sentResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Retrieved Successfully",
        data: result.data
    })
})

const getMe = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  
  const decodedToken = req.user as JwtPayload;
const result = await userService.getMe(decodedToken.userId)

  sentResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Your profile Retrieved Successfully",
        data: result.data
    })
})

 export const userController = {
    createUser,
    updateUser,
    getUsers,
    getSingleUser,
    getMe
 }