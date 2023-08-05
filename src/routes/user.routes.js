import { Router } from "express";
import { getUser, getRanking } from "../controllers/userController.js";
import { validateAuth } from "../middlewares/validateAuth.js";

const userRouter = Router();
userRouter.get("/users/me", validateAuth, getUser);
userRouter.get("/ranking", getRanking);

export default userRouter;