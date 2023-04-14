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
            execute: jest.fn().mockImplementation((movieId: string) => ({
                id: movieId,
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
                movie_id: '1234',
                rental_date: new Date('2023-04-14T10:00:00Z'),
            };

            jest.spyOn(usersRepositoryMock, 'findById').mockResolvedValueOnce(undefined);

            await expect(createRentalService.execute(data)).rejects.toThrow(
                new HttpException(HttpStatusCode.NOT_FOUND, 'User Not Found!')
            );
        });
    });

    describe('when user and movie exists and lease term is valid', () => {
        it('should create a rental', async () => {
            const data: IRequestRental = {
                user_id: 'user_id',
                movie_id: '1234',
                rental_date: new Date('2023-04-14T10:00:00Z'),
            };

            const rental = {
                id: '1',
                user_id: 'user_id',
                movie_id: '1102706',
                rental_date: new Date('2023-04-14T10:00:00Z'),
                return_date: undefined,
            };

            const movieData = mockMovieData();

            searchMovieIdService.execute.mockResolvedValueOnce({ id: movieData.id });
            jest.spyOn(usersRepositoryMock, 'findById').mockResolvedValueOnce({ id: 'user_id' } as User);
            searchMovieIdService.execute.mockResolvedValueOnce({ id: '1102706' });
            jest.spyOn(rentalsRepositoryMock, 'createRental').mockResolvedValueOnce(rental as any);
            jest.spyOn(leaseTermValidationService, 'execute').mockResolvedValueOnce(movieData.id);

            const result = await createRentalService.execute(data);

            expect(result).toEqual(rental);
            expect(searchMovieIdService.execute).toHaveBeenCalledWith('1102706');
            expect(usersRepositoryMock.findById).toHaveBeenCalledWith('user_id');
            expect(rentalsRepositoryMock.createRental).toHaveBeenCalledWith({
                user_id: 'user_id',
                movie_id: '1102706',
                rental_date: new Date('2023-04-14T10:00:00Z'),
            });
            expect(leaseTermValidationService.execute).toHaveBeenCalledWith(movieData.id, new Date('2023-04-14T10:00:00Z'));
        });
    });
});