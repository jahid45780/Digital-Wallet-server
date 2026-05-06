import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { adminService } from "./admin.service";
import { sentResponse } from "../../utils/sentResponse";

 

const getAllUsers = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const result = await adminService.getAllUsers();

     sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "All users fetched successfully",
      meta:result.meta,
      data:result.data
    });

})

const getAllAgents = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{

    const result = await adminService.getAllAgents();

     sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "All agents fetched successfully",
      meta:result.meta,
      data:result.data
    });


})

const approveAgent = catchAsync(async (req:Request, res:Response, next:NextFunction)=>{

     const userId = req.params.userId as string;

    const result = await adminService.approveAgent(userId)

     sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "Agent approved successfully",
      data: result,
    });

})

 const suspendAgent = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.params.userId as string;

    const result = await adminService.suspendAgent(userId);

      sentResponse(res, {
      success: true,
      statusCode: 200,
      message: "Agent suspended successfully",
      data: result,
    });

 })


export const adminController = {
    getAllUsers,
    getAllAgents,
    approveAgent,
    suspendAgent
}