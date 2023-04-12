import { Request, Response } from "express";
import { container } from "tsyringe";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import { createMoviesSchema } from "../schemas/movies/createMoviesSchema";
import { CreateMovieService } from "../../../services/movies/CreateMoviesService";
import { GetAllMoviesService } from "../../../services/movies/GetAllMoviesService";
import { FindByNameMovieService } from "../../../services/movies/FindByNameMovieService";
import { SoftDeleteByNameMovieService } from "../../../services/movies/SoftDeleteByNameMovieService";
import { softDeleteByNameMovieSchema } from "../schemas/movies/softDeleteByNameSchema";
import { UpdateMoviesService } from "../../../services/movies/UpdateMoviesService";
import { bodySchemaMovie, querySchemaMovie } from "../schemas/movies/updateMovieSchema";


export default class MoviesController {
    public async createMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const { name, description, year, author, genre, available } = await createMoviesSchema.validateAsync(request.body);

            const createMoviesService = container.resolve(CreateMovieService);

            const movie = await createMoviesService.execute({
                name,
                description,
                year,
                author,
                genre,
                available
            });

            return response.status(201).json(movie);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async getAllMovies(request: Request, response: Response): Promise<Response> {
        const listMoviesService = container.resolve(GetAllMoviesService);

        const movies = await listMoviesService.execute();

        return response.json(movies);
    }

    public async findByNameMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const name = request.query.name as string;

            const findByName = container.resolve(FindByNameMovieService);

            const movie = await findByName.execute(name);

            return response.json(movie);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async updateMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const { query, body } = request;
            const { name } = await querySchemaMovie.validateAsync(query);
            const { description, year, author, genre, available } = await bodySchemaMovie.validateAsync(body);

            const updateMovieService = container.resolve(UpdateMoviesService);
            const movie = await updateMovieService.execute({
                name,
                description,
                year,
                author,
                genre,
                available
            });

            return response.json(movie);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }


    public async softDeleteMovie(request: Request, response: Response, next): Promise<Response> {
        try {
            const { name } = await softDeleteByNameMovieSchema.validateAsync(request.query);

            const softDeleteUserService = container.resolve(SoftDeleteByNameMovieService);

            const movie = await softDeleteUserService.execute({ name });

            return response.json(movie);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}
