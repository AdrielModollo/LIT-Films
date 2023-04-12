import axios from "axios";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

export async function SearchMovieIdService(movie_id) {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'Movie not found.');
    }
}
