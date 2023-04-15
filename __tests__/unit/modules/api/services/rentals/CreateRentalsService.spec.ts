import { CreateRentalService } from '../../../../../../src/modules/api/services/rentals/CreateRentalService';
import { LeaseTermValidationService } from '../../../../../../src/modules/api/services/rentals/LeaseTermValidationService';
import IRentalsRepository from '../../../../../../src/modules/api/repositories/IRentalsRepository';
import RentalsRepositoryMock, { mockMovieData } from '../../../../repositories/MockRentalsRepository';
import IUsersRepository from '../../../../../../src/modules/api/repositories/IUsersRepository';
import UsersRepositoryMock from '../../../../repositories/MockUsersRepository';
import { IRequestRental } from '../../../../../../src/modules/api/dtos/rentals/IRequestRentalDTO';
import { HttpException, HttpStatusCode } from '../../../../../../src/shared/exceptions/HttpException';
import { SearchMovieIdService } from '../../../../../../src/modules/api/services/movies/SearchMovieIdService';

describe('CreateRentalService', () => {
    let createRentalService: CreateRentalService;
    let leaseTermValidationService: LeaseTermValidationService;
    let rentalsRepositoryMock: RentalsRepositoryMock;
    let usersRepositoryMock: UsersRepositoryMock;
    let searchMovieIdService: SearchMovieIdService;

    beforeEach(() => {
        rentalsRepositoryMock = new RentalsRepositoryMock();
        usersRepositoryMock = new UsersRepositoryMock();
        searchMovieIdService = {
            execute: jest.fn().mockImplementation((movie_id: number) => ({
                id: movie_id,
            })),
        };
        leaseTermValidationService = new LeaseTermValidationService(rentalsRepositoryMock);
        createRentalService = new CreateRentalService(
            rentalsRepositoryMock,
            leaseTermValidationService,
            usersRepositoryMock,
            searchMovieIdService,
        );
    });

    describe('when user does not exist', () => {
        it('should throw a not found exception', async () => {
            const data: IRequestRental = {
                user_id: 'user_id',
                movie_id: 1234,
                rental_date: new Date('2023-04-14T10:00:00Z'),
            };

            jest.spyOn(usersRepositoryMock, 'findById').mockResolvedValueOnce(undefined);

            await expect(createRentalService.execute(data)).rejects.toThrow(
                new HttpException(HttpStatusCode.NOT_FOUND, 'User Not Found!')
            );
        });
    });

    describe('when user exists', () => {
        it('should create a new rental', async () => {
            const user = {
                id: "5fd7e009-14c2-4dd5-86e0-bb54677eb60f",
                name: "John Doe",
                email: "johndoe@example.com",
                password: "$2a$08$F6p3iClwJRyu4FURz4YFmOFnrhDa57IaeNLA8gbhhKp.ElbxHZyla",
                rentals: [],
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            };

            const data: IRequestRental = {
                user_id: user.id,
                movie_id: 1102706,
                rental_date: new Date(),
            };

            jest.spyOn(usersRepositoryMock, 'findById').mockResolvedValueOnce(user);

            const createRentalMock = jest.spyOn(rentalsRepositoryMock, 'createRental');
            createRentalMock.mockImplementation(jest.fn());

            const newRental = await createRentalService.execute(data);

            expect(createRentalMock).toHaveBeenCalledWith({
                user_id: data.user_id,
                movie_id: data.movie_id,
                rental_date: data.rental_date,
            });
        });
    });
});