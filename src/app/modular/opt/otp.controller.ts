import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { otpService } from "./opt.service";
import { sentResponse } from "../../utils/sentResponse";

const sendOTP = catchAsync(async(req:Request, res:Response)=>{
    
    const {email, name} = req.body;

    await otpService.sendOTP(email, name)

    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsync (async (req:Request, res:Response) =>{
      const {email, otp} = req.body;

       await otpService.verifyOTP(email, otp)

        sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "OTP verified successfully",
        data: null,
    });
})

export const otpController = {
    sendOTP,
    verifyOTP
}