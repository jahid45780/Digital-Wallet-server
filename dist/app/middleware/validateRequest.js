"use strict";
// import { NextFunction, Request, Response } from "express";
// import { ZodSchema } from "zod";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = yield schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        // ✅ safe assign
        if (validatedData.body)
            req.body = validatedData.body;
        if (validatedData.params)
            req.params = validatedData.params;
        if (validatedData.query)
            req.query = validatedData.query;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.validateRequest = validateRequest;
