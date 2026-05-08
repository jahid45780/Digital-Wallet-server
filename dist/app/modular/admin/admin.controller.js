"use strict";
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
exports.adminController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const admin_service_1 = require("./admin.service");
const sentResponse_1 = require("../../utils/sentResponse");
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllUsers();
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All users fetched successfully",
        meta: result.meta,
        data: result.data
    });
}));
const getAllAgents = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_service_1.adminService.getAllAgents();
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "All agents fetched successfully",
        meta: result.meta,
        data: result.data
    });
}));
const approveAgent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield admin_service_1.adminService.approveAgent(userId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Agent approved successfully",
        data: result,
    });
}));
const suspendAgent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield admin_service_1.adminService.suspendAgent(userId);
    (0, sentResponse_1.sentResponse)(res, {
        success: true,
        statusCode: 200,
        message: "Agent suspended successfully",
        data: result,
    });
}));
exports.adminController = {
    getAllUsers,
    getAllAgents,
    approveAgent,
    suspendAgent
};
