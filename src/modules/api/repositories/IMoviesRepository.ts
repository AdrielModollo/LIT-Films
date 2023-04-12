import Movie from '../infra/typeorm/entities/Movie';
import { ICreateMovieDTO } from '../dtos/movies/ICreateMovieDTO';
import { IUpdateMovieDTO } from '../dtos/movies/IUpdateMovieDTO';

export default interface IUsersRepository {
    createMovies(data: ICreateMovieDTO): Promise<Movie>;
    getAllMovies(): Promise<Movie[]>;
    findByName(email: string): Promise<Movie | undefined>;
    updateMovies(id: string, data: Partial<IUpdateMovieDTO>): Promise<Movie | undefined>;
    softDeleteByName(email: string): Promise<Movie | undefined>;
}


