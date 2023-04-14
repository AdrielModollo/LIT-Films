import { ICreateRentalDTO } from "../../../src/modules/api/dtos/rentals/ICreateRentalDTO";
import { IUpdateRentalDTO } from "../../../src/modules/api/dtos/rentals/IUpdateRentalDTO";
import Rental from "../../../src/modules/api/infra/typeorm/entities/Rental";
import IRentalsRepository from "../../../src/modules/api/repositories/IRentalsRepository";

class RentalsRepositoryMock implements IRentalsRepository {
    private rentals: Rental[] = [];

    createRental(data: ICreateRentalDTO): Promise<Rental> {
        throw new Error("Method not implemented.");
    }

    getAllRentals(): Promise<Rental[]> {
        throw new Error("Method not implemented.");
    }

    findByName(name: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }

    findByUserIdAndMovieId(user_id: string, movie_id: string): Promise<Rental[]> {
        const rentals = this.rentals.filter(
            (rental) => rental.user_id === user_id && rental.movie_id === movie_id
        );
        return Promise.resolve(rentals);
    }

    updateRental(id: string, data: Partial<IUpdateRentalDTO>): Promise<Rental> {
        throw new Error("Method not implemented.");
    }

    public getRentals(rentals: Rental[]): void {
        this.rentals = rentals;
    }
}

export default RentalsRepositoryMock;
