import { inject, injectable } from "tsyringe";
import Movie from "../../infra/typeorm/entities/Movie";
import IMoviesRepository from "../../repositories/IMoviesRepository";
import { IRequestMovie } from "../../dtos/movies/IRequestMovieDTO";

@injectable()
export class SoftDeleteByNameMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    async execute({ name }: IRequestMovie): Promise<Movie | undefined> {
        const movie = await this.moviesRepository.findByName(name);

        if (!movie) {
            throw new Error("Movie not found");
        }

        const result = await this.moviesRepository.softDeleteByName(name);

        return result
    }
}