// import { NextFunction, Request, Response } from "express";
// import { ZodSchema } from "zod";

// export const validateRequest =
//   (zodSchema: ZodSchema) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       let parsedBody;

//       // 🔥 safe check (form-data support)
//       if (req.body?.data) {
//         parsedBody = JSON.parse(req.body.data);
//       } else {
//         parsedBody = req.body;
//       }

//       // ✅ validate with zod
//       const validatedData = await zodSchema.parseAsync(parsedBody);

//       // override body with validated data
//       req.body = validatedData;

//       next();
//     } catch (error) {
//       next(error);
//     }
//   };

import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// ✅ define expected structure
type RequestSchema = {
  body?: any;
  params?: any;
  query?: any;
};

export const validateRequest =
  <T extends RequestSchema>(schema: ZodSchema<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // ✅ safe assign
      if (validatedData.body) req.body = validatedData.body;
      if (validatedData.params) req.params = validatedData.params;
      if (validatedData.query) req.query = validatedData.query;

      next();
    } catch (error) {
      next(error);
    }
  };