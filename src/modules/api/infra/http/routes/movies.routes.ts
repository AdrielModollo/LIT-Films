import { Router } from "express";
import MoviesController from "../controllers/MoviesController";

const moviesRouter = Router();
const moviesController = new MoviesController();

moviesRouter.get("/", moviesController.searchMovies);
moviesRouter.get("/popular", moviesController.getPopularMovies);
moviesRouter.get("/id", moviesController.searchMovieId);

export default moviesRouter;
