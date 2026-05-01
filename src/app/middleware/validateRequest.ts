import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";



export const validateRequest = 
(zodSchema:ZodTypeAny) =>

async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let parsedBody;

        if(req.body?.data){
            parsedBody = JSON.parse(req.body.data);
        }else{
            parsedBody = req.body;
        }

          // validate with zod
       const validatedData = await zodSchema.parseAsync({
        body: parsedBody,
      }) as any;
         req.body = validatedData.body;
       next()

    } catch (error) {
        next(error)
    }
}
