import { CreateRentalService } from '../../../../../../src/modules/api/services/rentals/CreateRentalService';
import { LeaseTermValidationService } from '../../../../../../src/modules/api/services/rentals/LeaseTermValidationService';
import RentalsRepositoryMock, { mockMovieData } from '../../../../repositories/MockRentalsRepository';
import UsersRepositoryMock from '../../../../repositories/MockUsersRepository';
import { IRequestRental } from '../../../../../../src/modules/api/dtos/rentals/IRequestRentalDTO';
import { HttpException, HttpStatusCode } from '../../../../../../src/shared/exceptions/HttpException';
import User from '../../../../../../src/modules/api/infra/typeorm/entities/User';


describe('CreateRentalService', () => {
    let createRentalService: CreateRentalService;
    let leaseTermValidationService: LeaseTermValidationService;
    let rentalsRepositoryMock: RentalsRepositoryMock;
    let usersRepositoryMock: UsersRepositoryMock;
    let searchMovieIdService;

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
});