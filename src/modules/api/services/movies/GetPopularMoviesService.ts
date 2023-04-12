import axios from "axios";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

export async function GetPopularMoviesService() {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`;

    const responseApi = await axios.get(apiUrl);

    const { results } = responseApi.data;

    if (results.length === 0) {
        throw new HttpException(HttpStatusCode.NOT_FOUND, 'Movies not found.');
    }

    return responseApi.data;
}
