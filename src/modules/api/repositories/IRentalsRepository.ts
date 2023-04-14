import Rental from '../infra/typeorm/entities/Rental';
import { ICreateRentalDTO } from '../dtos/rentals/ICreateRentalDTO';
import { IUpdateRentalDTO } from '../dtos/rentals/IUpdateRentalDTO';

export default interface IRentalsRepository {
    createRental(data: ICreateRentalDTO): Promise<Rental>;
    getAllRentals(): Promise<Rental[]>;
    findByName(name: string): Promise<Rental | undefined>;
    findByUserIdAndMovieId(user_id: string, movie_id: string): Promise<Rental[]>;
    updateRental(id: string, data: Partial<IUpdateRentalDTO>): Promise<Rental | undefined>;
}
