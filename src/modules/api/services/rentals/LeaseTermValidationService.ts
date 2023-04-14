import { inject, injectable } from "tsyringe";
import Rental from "../../infra/typeorm/entities/Rental";
import IRentalsRepository from "../../repositories/IRentalsRepository";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

@injectable()
export class LeaseTermValidationService {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) { }

    async execute(user_id: string, movie_id: string, rental_date: Date): Promise<Rental> {
        const rentals = await this.rentalsRepository.findByUserIdAndMovieId(user_id, movie_id);

        if (rentals.length > 0 && rentals.some(rental => rental.rental_date.getTime() >= rental_date.getTime() - 48 * 60 * 60 * 1000)) {
            throw new HttpException(HttpStatusCode.CONFLICT, "You cannot rent the same movie within 48 hours!");
        }

        return rentals[0];
    }
}
