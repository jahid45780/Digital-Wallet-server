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

const  getAllWallets = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{


  const result = await walletService.getAllWallets()

    sentResponse(res, {
    success: true,
    statusCode: 200,
    message: "All wallets fetched successfully",
    meta:result.meta,
    data: result,
  });

})

const  blockWallet = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
 
   const result = await walletService.blockWallet(
      req.params.walletId as string
    );


  sentResponse(res,{
    success:true,
    statusCode:200,
    message:" successful block Wallet ",
    data:result
  })
})



const unblockWallet = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{
    
    const result = await walletService.unblockWallet(
      req.params.walletId as string
    )

    sentResponse(res, {
    success: true,
    statusCode: 200,
    message: "successfully unblock wallet",
    data: result,
  });

})


export const walletController ={
    getMyWallet,
    getAllWallets,
    blockWallet,
    unblockWallet
    
}