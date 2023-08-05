import { Router } from "express";
import { signup } from "../controllers/authController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { schemaSignup } from "../schemas/auth.schemas.js";

const userRouter = Router();
userRouter.post("/signup", validateSchema(schemaSignup), signup);

export default userRouter;