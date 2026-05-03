import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sentResponse } from "../../utils/sentResponse"
import  httpStatus  from 'http-status-codes';
import { transactionService } from "./transaction.service";
import AppError from "../../errorHerplrs/appError";

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
 
export const transactionController = {
   addMoney
}