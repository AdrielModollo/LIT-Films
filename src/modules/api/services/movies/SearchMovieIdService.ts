import { ApiService } from '../../../../shared/exceptions/ApiService';
import { IMovieData } from '../../dtos/movies/IMovieData';
import { configEnv } from '../../infra/http/middlewares/configEnv';

export async function SearchMovieIdService(movie_id: number): Promise<IMovieData> {
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${configEnv.TMDB_API_KEY}`;

    return await ApiService.get<IMovieData>(url);
}
