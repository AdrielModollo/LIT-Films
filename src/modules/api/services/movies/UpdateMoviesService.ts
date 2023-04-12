import { inject, injectable } from "tsyringe";
import IMoviesRepository from "../../repositories/IMoviesRepository";
import { IRequestMovie } from "../../dtos/movies/IRequestMovieDTO";
import Movie from "../../infra/typeorm/entities/Movie";

@injectable()
export class UpdateMoviesService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }


    async execute({ name, description, year, author, genre, available }: IRequestMovie): Promise<Movie> {
        const movie = await this.moviesRepository.findByName(name);

        if (!movie) {
            throw new Error("Movie not found");
        }

        const updatedMovie = {
            ...movie,
            name,
            description,
            year,
            author,
            genre,
            available
        };

        const result = await this.moviesRepository.updateMovies(updatedMovie.id, updatedMovie);

        return result;
    }
}
