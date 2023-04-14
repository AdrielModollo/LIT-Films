import { ICreateRentalDTO } from "../../../src/modules/api/dtos/rentals/ICreateRentalDTO";
import { IUpdateRentalDTO } from "../../../src/modules/api/dtos/rentals/IUpdateRentalDTO";
import Rental from "../../../src/modules/api/infra/typeorm/entities/Rental";
import IRentalsRepository from "../../../src/modules/api/repositories/IRentalsRepository";

export function mockMovieData(): any {
    return {
        id: 1102706,
        title: "Example Movie",
        overview: "This is a mock movie for testing purposes",
        release_date: "2022-01-01",
        genres: [{ id: 1, name: "Action" }, { id: 2, name: "Adventure" }],
        poster_path: "/example-poster.jpg",
        backdrop_path: "/example-backdrop.jpg",
        runtime: 120,
        vote_average: 7.5,
    };
}

class RentalsRepositoryMock implements IRentalsRepository {
    private rentals: Rental[] = [];

    createRental(data: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            id: 'e9e0ede8-0d34-4261-be3f-d8e565c319fb',
            user_id: data.user_id,
            movie_id: data.movie_id,
            rental_date: data.rental_date,
            return_date: data.return_date,
            created_at: new Date(),
            updated_at: new Date(),
        });
        this.rentals.push(rental);
        return Promise.resolve(rental);
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
