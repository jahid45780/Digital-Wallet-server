import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletService } from "./wallet.service";
import { sentResponse } from "../../utils/sentResponse";
import { Wallet } from "./wallet.model";
import AppError from "../../errorHerplrs/appError";


const getMyWallet = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{


    const result = await walletService.getMyWallet((req.user as any).userId );

    sentResponse(res,{
    success: true,
    statusCode: 200,
    message: "Wallet fetched successfully",
    data: result,
    })

})

const addMoney = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{


  const userId = (req.user as any)?.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

    const result = await walletService.addMoney(
        userId,
        req.body.amount
    )

    sentResponse(res, {
    success: true,
    statusCode: 200,
    message: "Money added successfully",
    data: result,
  });

})

const withdraw = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const userId = (req.user as any)?.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await walletService.withdraw(
    userId,
    req.body.amount
  )

  sentResponse(res,{
    success:true,
    statusCode:200,
    message:"Withdraw successful",
    data:result
  })
})



const sendMoney = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
    
      const userId = (req.user as any)?.userId;
  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }
    
    const result = await walletService.sendMoney(
        userId,
        req.body.receiverId,
        req.body.amount
    )

    sentResponse(res, {
    success: true,
    statusCode: 200,
    message: "Money sent successfully",
    data: result,
  });

})


export const walletController ={
    getMyWallet,
    addMoney,
    withdraw,
    sendMoney
    
}