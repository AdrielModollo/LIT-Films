import { inject, injectable } from "tsyringe";
import IRentalsRepository from "../../repositories/IRentalsRepository";
import Rental from "../../infra/typeorm/entities/Rental";
import { IUpdateRentalDTO } from "../../dtos/rentals/IUpdateRentalDTO";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

@injectable()
export class UpdateRentalService {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
    ) { }

    async execute({ user_id, movie_id, return_date }: IUpdateRentalDTO): Promise<Rental> {
        return_date = new Date();

        const rentalMovie = await this.rentalsRepository.findByUserIdAndMovieId(user_id, movie_id)

        if (!rentalMovie) {
            throw new HttpException(HttpStatusCode.NOT_FOUND, "User or movie not found");
        }

        const updateRental = {
            ...rentalMovie,
            return_date
        }

        const result = await this.rentalsRepository.updateRental(updateRental.id, updateRental);

        return result;
    }
}
