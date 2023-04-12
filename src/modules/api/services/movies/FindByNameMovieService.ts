import { inject, injectable } from "tsyringe";
import Movie from "../../infra/typeorm/entities/Movie";
import IMoviesRepository from "../../repositories/IMoviesRepository";

@injectable()
export class FindByNameMovieService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    async execute(name: string): Promise<Movie | undefined> {
        const movie = await this.moviesRepository.findByName(name);

        if (!movie) {
            throw new Error("Name movie not found");
        }

        return movie;
    }
}
