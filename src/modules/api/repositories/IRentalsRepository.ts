import Rental from '../infra/typeorm/entities/Rental';
import { ICreateRentalDTO } from '../dtos/rentals/ICreateRentalDTO';

export default interface IRentalsRepository {
    createRental(data: ICreateRentalDTO): Promise<Rental>;
    getAllRentals(): Promise<Rental[]>;
    findByName(name: string): Promise<Rental | undefined>;
    findByUserIdAndMovieId(userId: string, movieId: string): Promise<Rental | undefined>;
}
