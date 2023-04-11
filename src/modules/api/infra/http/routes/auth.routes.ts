import { Router } from "express";
import AuthenticateController from "../controllers/AuthenticateController";
import validateJwtSecret from "../middlewares/validJwtSecret";

const authenticateRouter = Router();
const authenticateController = new AuthenticateController();

authenticateRouter.post("/login", authenticateController.login);
authenticateRouter.post("/", validateJwtSecret, authenticateController.create);


export default authenticateRouter;
