import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sentResponse } from "../../utils/sentResponse"
import  httpStatus  from 'http-status-codes';
import { transactionService } from "./transaction.service";
import AppError from "../../errorHerplrs/appError";
import { any } from "zod";

const addMoney = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const userId = (req.user as any )?.userId
      if (!userId) {
    throw new AppError(401, "Unauthorized");
  }
 
    const result = await transactionService.addMoney(
    userId,
    req.body.amount
  );

      sentResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Money added successfully",
        data: result
    })
})

const withdraw = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
  
  const userId = (req.user as any).userId;

   if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

 const result = await transactionService.withdraw(
    userId,
    req.body.amount
 )

   sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "Withdraw successful",
      data: result,
    });

})

const sendMoney = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{

  const userId = (req.user as any).userId;

   if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await transactionService.sendMoney(
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

const cashIn = catchAsync (async(req:Request, res:Response, next:NextFunction)=>{
  
  
  const userId = (req.user as any).userId;

   if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const result  = await transactionService.cashIn(
      userId,
      req.body.userId,
      req.body.amount
  )

      sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "Cash in successful",
      data: result,
    });

})

const cashOut = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{

  const userId = (req.user as any).userId;

    if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await transactionService.cashOut(
      userId,
      req.body.userId,
      req.body.amount
  )

    sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "Cash out successful",
      data: result,
    });


})

const myTransactions = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
  
  const  userId  = (req.user as any).userId;

     if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const result = await transactionService.myTransactions(userId)

   sentResponse(res, {
      success: true,
      statusCode: 200,
      message:
        "Transactions fetched successfully",
      data: result,
    });

})
 
export const transactionController = {
   addMoney,
   withdraw,
   sendMoney,
   cashIn,
   cashOut,
   myTransactions
}