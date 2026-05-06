import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../auth/authCheck";
import { Role } from "./user.interface";



const router = Router()


router.post("/register", validateRequest(createUserZodSchema),userController.createUser)
router.get("/all-user", checkAuth(Role.ADMIN), userController.getUsers)
router.get("/me", checkAuth(...Object.values(Role)), userController.getMe)
router.get("/:id", checkAuth(Role.ADMIN), userController.getSingleUser)
router.patch("/:id", checkAuth(...Object.values(Role)), validateRequest(updateUserZodSchema), userController.updateUser)

export const userRouter = router; 