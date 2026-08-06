
import express from "express";
import { otpController } from "./otp.controller";

const router = express.Router()

router.post("/send-otp", otpController.sendOTP)
router.post("/verify-otp", otpController.verifyOTP)

export const  OtpRoutes = router;

