import { Router } from "express";
import RentalsController from "../controllers/RentalsController";

const rentalsRoutes = Router();
const rentalsController = new RentalsController();

rentalsRoutes.post("/", rentalsController.createRental);

export default rentalsRoutes;
