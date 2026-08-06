import crypto from "crypto";
import { User } from "../user/user.model";
import AppError from "../../errorHerplrs/appError";
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";
import { promise } from "zod";

 const OTP_EXPIRATION = 2 * 60;

 const generateOtp = (length = 6) => {
     //6 digit otp 
     const otp = crypto.randomInt(10 **(length -1), 10 ** length).toString();
     return otp;
 }

 const sendOTP = async (email: string, name: string) => {

    const user  = await User.findOne({ email});

    if(!user) throw new AppError(404, "User  not found");

    if(user.IsVerified){
        throw  new AppError(400,"You are already verified")
    }

    const otp = generateOtp();

    const redisKey = `otp:${email}`;

    await redisClient.set(redisKey, otp,{
        expiration:{
            type:"EX",
            value:OTP_EXPIRATION
        }
    })

     await sendEmail({
        to:email,
        subject:"Your OTP Code",
        templateName:"otp",
        templateData:{
            name:name,
            otp:otp
        }
    })

 }

 const verifyOTP = async (email: string, otp: string) => {

       const user = await User.findOne({email});

       if(!user) {
        throw new AppError(404, "user not found")
       }

       if(user.IsVerified){
        throw new AppError(400, "user is already verified")
       }

       const redisKey = `otp:${email}`;

       const saveOtp = await redisClient.get(redisKey);

       if(!saveOtp){
        throw new AppError(400, "invalid OTP")
       }

       if(saveOtp !== otp){
        throw new  AppError(400, "invalid OTP")
       }

       await Promise.all([
           User.findOneAndUpdate({email}, {IsVerified:true},  {runValidators:true}),
           redisClient.del([redisKey])
       ])
 }

 export const otpService = {
    sendOTP,
    verifyOTP
 }