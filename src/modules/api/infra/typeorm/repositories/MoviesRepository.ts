import { getRepository, Repository } from "typeorm";
import Movie from "../entities/Movie";
import IMoviesRepository from "../../../repositories/IMoviesRepository";
import { ICreateMovieDTO } from "../../../dtos/movies/ICreateMovieDTO";
import { IUpdateMovieDTO } from "../../../dtos/movies/IUpdateMovieDTO";

class MoviesRepository implements IMoviesRepository {
    private ormRepository: Repository<Movie>;

    constructor() {
        this.ormRepository = getRepository(Movie);
    }

    public async createMovies({ name, description, year, author, genre, available }: ICreateMovieDTO): Promise<Movie> {
        const movie = this.ormRepository.create({
            name,
            description,
            year,
            author,
            genre,
            available
        });

        await this.ormRepository.save(movie);

        return movie;
    }

    public async getAllMovies(): Promise<Movie[]> {
        const users = await this.ormRepository.find();
        return users;
    }

    public async findByName(name: string): Promise<Movie | undefined> {
        const movie = await this.ormRepository.findOne({
            where: { name },
        });
        return movie;
    }

    public async updateMovies(id: string, data: Partial<IUpdateMovieDTO>): Promise<Movie | undefined> {
        const movie = await this.ormRepository.findOne({
            where: { id },
        });

        Object.assign(movie, data);

        const updateMovie = await this.ormRepository.save(movie);

        return updateMovie;
    }

    public async softDeleteByName(name: string): Promise<Movie | undefined> {
        const movie = await this.ormRepository.findOne({
            where: { name, deleted_at: null },
        });

        movie.deleted_at = new Date();

        const result = await this.ormRepository.save(movie);

        return result
    }
}


export default MoviesRepository;
