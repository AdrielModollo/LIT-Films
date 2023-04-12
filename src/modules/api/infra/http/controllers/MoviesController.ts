import { Request, Response } from "express";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import { SearchMoviesService } from "../../../services/movies/SearchMoviesService";
import { GetPopularMoviesService } from "../../../services/movies/GetPopularMoviesService";
import { SearchMovieIdService } from "../../../services/movies/SearchMovieIdService";

export default class MoviesController {

    public async searchMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const { query, language, page } = request.query;

            const movies = await SearchMoviesService(query, language, page);

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async searchMovieId(request: Request, response: Response, next): Promise<Response> {
        try {
            const { movie_id } = request.query;

            const movies = await SearchMovieIdService(movie_id);

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async getPopularMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const movies = await GetPopularMoviesService();

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}

