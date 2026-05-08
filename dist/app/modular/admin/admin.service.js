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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const appError_1 = __importDefault(require("../../errorHerplrs/appError"));
const user_model_1 = require("../user/user.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find().sort({ createdAt: -1 });
    const totalUser = yield user_model_1.User.countDocuments();
    return {
        data: users,
        meta: {
            total: totalUser
        }
    };
});
const getAllAgents = () => __awaiter(void 0, void 0, void 0, function* () {
    const agents = yield user_model_1.User.find({ role: "AGENT" }).sort({ createdAt: -1 });
    const totalAgents = yield user_model_1.User.countDocuments({ role: "AGENT" });
    return {
        data: agents,
        meta: {
            total: totalAgents
        }
    };
});
const approveAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield user_model_1.User.findById(userId);
    if (!agent) {
        throw new appError_1.default(404, "Agent not found");
    }
    if (agent.role !== "AGENT") {
        throw new appError_1.default(400, "User is not an agent");
    }
    if (agent.isApproved) {
        throw new appError_1.default(400, "Agent already approve");
    }
    agent.isApproved = true;
    yield agent.save();
    return agent;
});
const suspendAgent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const agent = yield user_model_1.User.findById(userId);
    if (!agent) {
        throw new appError_1.default(404, "agent not found");
    }
    if (agent.role !== "AGENT") {
        throw new appError_1.default(400, "User is not an agent");
    }
    if (!agent.isApproved) {
        throw new appError_1.default(400, "Agent already suspended");
    }
    agent.isApproved = false;
    yield agent.save();
    return agent;
});
exports.adminService = {
    getAllUsers,
    getAllAgents,
    approveAgent,
    suspendAgent
};
