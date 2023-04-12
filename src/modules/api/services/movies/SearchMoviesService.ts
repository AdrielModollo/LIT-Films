import axios from "axios";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

export async function SearchMoviesService(query?, language?, page?) {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=${language}&page=${page || 1}`;

    const responseApi = await axios.get(apiUrl);

    const { results } = responseApi.data;

    if (results.length === 0) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'Movie not found.');
    }

    return results;
}

