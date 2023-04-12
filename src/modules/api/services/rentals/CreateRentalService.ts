import { inject, injectable } from "tsyringe";
import Rental from "../../infra/typeorm/entities/Rental";
import IRentalsRepository from "../../repositories/IRentalsRepository";
import { IRequestRental } from "../../dtos/rentals/IRequestRentalDTO";
import { SearchMovieIdService } from "../movies/SearchMovieIdService";

@injectable()
export class CreateRentalService {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) { }

    async execute({ user_id, movie_id, rental_date, return_date }: IRequestRental): Promise<Rental> {

        const movie = await SearchMovieIdService(movie_id);

        const rental = await this.rentalsRepository.createRental({
            user_id,
            movie_id: movie.id,
            rental_date,
            return_date,
        });

        return rental;
    }
}
