import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";



const router = Router()


router.post("/register", validateRequest(createUserZodSchema),userController.createUser)
router.get("/all-user", userController.getUsers)
router.get("/:id", userController.getSingleUser)
router.patch("/:id", validateRequest(updateUserZodSchema), userController.updateUser)

export const userRouter = router; 