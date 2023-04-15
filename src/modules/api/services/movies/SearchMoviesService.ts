import { configEnv } from '../../infra/http/middlewares/configEnv';
import { ApiService } from "../../../../shared/exceptions/ApiService";

export async function SearchMoviesService(query: string, language: string, page = 1): Promise<any> {
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${configEnv.TMDB_API_KEY}&query=${query}&language=${language}&page=${page}`;
    const response = await ApiService.get(apiUrl);

    return response;
}
