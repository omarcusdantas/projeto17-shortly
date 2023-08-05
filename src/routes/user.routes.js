import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();
userRouter.get("/users/me", validateAuth, getUser);

export default userRouter;