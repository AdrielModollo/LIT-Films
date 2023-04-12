import { inject, injectable } from "tsyringe";
import Movie from "../../infra/typeorm/entities/Movie";
import IMoviesRepository from "../../repositories/IMoviesRepository";

@injectable()
export class GetAllMoviesService {
    constructor(
        @inject('MoviesRepository')
        private moviesRepository: IMoviesRepository,
    ) { }

    async execute(): Promise<Movie[]> {
        const users = await this.moviesRepository.getAllMovies();
        return users;
    }
}
