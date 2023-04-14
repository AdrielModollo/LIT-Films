import { getRepository, Repository } from "typeorm";
import Rental from "../entities/Rental";
import IRentalsRepository from "../../../repositories/IRentalsRepository";
import { ICreateRentalDTO } from "../../../dtos/rentals/ICreateRentalDTO";
import { IUpdateRentalDTO } from "../../../dtos/rentals/IUpdateRentalDTO";

class RentalsRepository implements IRentalsRepository {
    private ormRepository: Repository<Rental>;

    constructor() {
        this.ormRepository = getRepository(Rental);
    }

    public async createRental({ user_id, movie_id, rental_date, return_date }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.ormRepository.create({
            user_id,
            movie_id,
            rental_date,
            return_date,
        });

        await this.ormRepository.save(rental);

        return rental;
    }


    public async updateRental(id: string, data: Partial<IUpdateRentalDTO>): Promise<Rental | undefined> {
        const user = await this.ormRepository.findOne({
            where: { id },
        });

        Object.assign(user, data);

        const updatedUser = await this.ormRepository.save(user);

        return updatedUser;
    }

    public async getAllRentals(): Promise<Rental[]> {
        const rentals = await this.ormRepository.find();
        return rentals;
    }

    public async findByName(name: string): Promise<Rental | undefined> {
        const rental = await this.ormRepository.findOne({
            where: { name },
        });
        return rental;
    }

    public async findByUserIdAndMovieId(user_id: string, movie_id: string): Promise<Rental[]> {
        const rentals = await this.ormRepository.find({
            where: { user_id, movie_id },
        });

        return rentals;
    }
}

export default RentalsRepository;
