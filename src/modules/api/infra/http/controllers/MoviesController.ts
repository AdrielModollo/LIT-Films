import { Request, Response } from "express";
import httpExceptionMiddleware from "../middlewares/errorHandlerMiddleware";
import axios from "axios";

export default class MoviesController {

    public async getMovieVideos(request: Request, response: Response, next): Promise<Response> {
        try {
            const { movieId } = request.query;
            const apiKey = process.env.TMDB_API_KEY;

            const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

            console.log(apiUrl)

            const responseApi = await axios.get(apiUrl);

            return response.json(responseApi.data);
        } catch (error) {
            return httpExceptionMiddleware(error, request, response, next);
        }
    }
}
