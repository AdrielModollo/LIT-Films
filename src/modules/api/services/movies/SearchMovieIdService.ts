import axios from "axios";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

export async function SearchMovieIdService(movie_id) {
    const apiKey = process.env.TMDB_API_KEY;

    const apiUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`;

    const responseApi = await axios.get(apiUrl);

    if (!responseApi.data) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'Movie not found.');
    }

    return responseApi.data;
}
