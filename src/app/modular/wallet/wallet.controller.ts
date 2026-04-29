import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { walletService } from "./wallet.service";
import { sentResponse } from "../../utils/sentResponse";


const getMyWallet = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{


    const result = await walletService.getMyWallet(req.body.userId);

    sentResponse(res,{
    success: true,
    statusCode: 200,
    message: "Wallet fetched successfully",
    data: result,
    })

})

export const walletController ={
    getMyWallet
}