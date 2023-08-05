import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { validateAuth } from "../middlewares/validateAuth.js";
import { schemaUrl } from "../schemas/urls.schemas.js";

const utlsRouter = Router();
utlsRouter.post("/urls/shorten", validateAuth, validateSchema(schemaUrl), shortenUrl);

export default utlsRouter;