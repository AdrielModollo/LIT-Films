import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/email", usersController.findByEmailUsers);
usersRouter.patch("/", usersController.updateUsers);
usersRouter.delete("/", usersController.softDeleteUser);

export default usersRouter;
