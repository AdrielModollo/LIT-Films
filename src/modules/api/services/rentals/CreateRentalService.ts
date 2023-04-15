import { inject, injectable } from "tsyringe";
import Rental from "../../infra/typeorm/entities/Rental";
import IRentalsRepository from "../../repositories/IRentalsRepository";
import { IRequestRental } from "../../dtos/rentals/IRequestRentalDTO";
import { SearchMovieIdService } from "../movies/SearchMovieIdService";
import { LeaseTermValidationService } from "./LeaseTermValidationService";
import IUsersRepository from "../../repositories/IUsersRepository";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";

@injectable()
export class CreateRentalService {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('LeaseTermValidationService')
        private leaseTermValidationService: LeaseTermValidationService,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    async execute({ user_id, movie_id, rental_date, }: IRequestRental): Promise<Rental> {

        rental_date = new Date();

        const userExists = await this.usersRepository.findById(user_id);

        if (!userExists) {
            throw new HttpException(HttpStatusCode.NOT_FOUND, "User Not Found!");
        }

        const movie = await SearchMovieIdService(movie_id);

        await this.leaseTermValidationService.execute(user_id, movie_id, rental_date);

        const newRental = await this.rentalsRepository.createRental({
            user_id,
            movie_id: movie.id,
            rental_date
        });

        return newRental;
    }
}
