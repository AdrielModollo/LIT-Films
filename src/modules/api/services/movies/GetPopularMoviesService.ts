import { ApiService } from '../../../../shared/exceptions/ApiService';
import { configEnv } from '../../infra/http/middlewares/configEnv';
import { IMovieData } from '../../dtos/movies/IMovieData';

export async function GetPopularMoviesService(): Promise<IMovieData[]> {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${configEnv.TMDB_API_KEY}&language=en-US`;
    const results = await ApiService.get<IMovieData[]>(apiUrl);

    return results;
}
