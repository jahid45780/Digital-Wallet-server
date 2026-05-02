import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod/v3";


export const validateRequest =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let parsedBody;

      // 🔥 safe check
      if (req.body?.data) {
        parsedBody = JSON.parse(req.body.data);
      } else {
        parsedBody = req.body;
      }

      // validate with zod
      const validatedData = await zodSchema.parseAsync(parsedBody);

      req.body = validatedData;

      next();
    } catch (error) {
      next(error);
    }
  };


// import { NextFunction, Request, Response } from "express";
// import { ZodTypeAny } from "zod";

// export const validateRequest =
//   (zodSchema: ZodTypeAny) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       let parsedBody;

//       if (req.body?.data) {
//         parsedBody = JSON.parse(req.body.data);
//       } else {
//         parsedBody = req.body;
//       }

//       // 🔥 FULL request validate
//       const validatedData = await zodSchema.parseAsync({
//         body: parsedBody,
//         params: req.params,
//         query: req.query,
//       }) as any;

//       // 🔥 overwrite safely
//       req.body = validatedData.body;
//       req.params = validatedData.params;
//       req.query = validatedData.query;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };



