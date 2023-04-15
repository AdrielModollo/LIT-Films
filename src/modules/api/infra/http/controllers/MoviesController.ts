import { Request, Response } from "express";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import { SearchMoviesService } from "../../../services/movies/SearchMoviesService";
import { GetPopularMoviesService } from "../../../services/movies/GetPopularMoviesService";
import { SearchMovieIdService } from "../../../services/movies/SearchMovieIdService";
import { container } from "tsyringe";
import { MovieQuery } from "../../../dtos/movies/ISearchMovies";

export default class MoviesController {

    public async searchMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const { query, language, page } = request.query as unknown as MovieQuery;

            const searchMoviesService = await container.resolve(SearchMoviesService);

            const movies = await searchMoviesService.execute(
                query,
                language,
                page
            )

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async searchMovieId(request: Request, response: Response, next): Promise<Response> {
        try {
            const { movie_id } = request.query;

            const searchMovieIdService = container.resolve(SearchMovieIdService);

            const movies = await searchMovieIdService.execute(Number(movie_id));

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }

    public async getPopularMovies(request: Request, response: Response, next): Promise<Response> {
        try {
            const getPopularMoviesService = container.resolve(GetPopularMoviesService);

            const movies = await getPopularMoviesService.execute();

            return response.json(movies);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}

