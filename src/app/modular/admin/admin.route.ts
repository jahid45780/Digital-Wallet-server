import { Router } from "express";
import { checkAuth } from "../auth/authCheck";
import { Role } from "../user/user.interface";
import { adminController } from "./admin.controller";

const router = Router()

router.get("/all-user", checkAuth(Role.ADMIN), adminController.getAllUsers)
router.get("/agents", checkAuth(Role.ADMIN), adminController.getAllAgents)
router.patch("/approve-agent/:userId", checkAuth(Role.ADMIN), adminController.approveAgent)
router.patch("/suspend-agent/:userId", checkAuth(Role.ADMIN), adminController.suspendAgent)

export const adminRouter = router;