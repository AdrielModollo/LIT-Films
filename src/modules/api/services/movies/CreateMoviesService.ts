import { inject, injectable } from "tsyringe";
import Movie from "../../infra/typeorm/entities/Movie";
import IMoviesRepository from "../../repositories/IMoviesRepository";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";
import { IRequestMovie } from "../../dtos/movies/IRequestMovieDTO";

@injectable()
export class CreateMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    async execute({ name, description, year, author, genre, available }: IRequestMovie): Promise<Movie> {
        const movieExists = await this.moviesRepository.findByName(name);

        if (movieExists) {
            throw new HttpException(HttpStatusCode.CONFLICT, 'Movie name already used.');
        }

        const movie = await this.moviesRepository.createMovies({
            name,
            description,
            year,
            author,
            genre,
            available
        });

        return movie;
    }
}
