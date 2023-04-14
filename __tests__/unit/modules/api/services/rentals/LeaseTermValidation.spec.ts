import RentalsRepositoryMock from '../../../../repositories/MockRentalsRepository';
import { LeaseTermValidationService } from '../../../../../../src/modules/api/services/rentals/LeaseTermValidationService';
import { HttpException, HttpStatusCode } from '../../../../../../src/shared/exceptions/HttpException';

describe('LeaseTermValidationService', () => {
    let rentalsRepository: RentalsRepositoryMock;
    let leaseTermValidationService: LeaseTermValidationService;

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryMock();
        leaseTermValidationService = new LeaseTermValidationService(rentalsRepository);
        jest.spyOn(rentalsRepository, 'findByUserIdAndMovieId').mockResolvedValue([]);
    });

    describe('when there are no rentals for the user and movie', () => {
        it('should not throw an exception', async () => {
            const user_id = 'user_id';
            const movie_id = 'movie_id';
            const rental_date = new Date('2023-04-14T10:00:00Z');

            const rental = await leaseTermValidationService.execute(user_id, movie_id, rental_date);

            expect(rentalsRepository.findByUserIdAndMovieId).toHaveBeenCalledWith(user_id, movie_id);
            expect(rental).toBeUndefined();
        });

    });

    describe('when there is a rental for the user and movie within 48 hours', () => {
        it('should throw a conflict exception', async () => {
            const user_id = 'user_id';
            const movie_id = 'movie_id';
            const rental_date = new Date('2023-04-14T10:00:00Z');
            const rental1 = {
                id: 'rental_id_1',
                user_id,
                movie_id,
                rental_date: new Date('2023-04-12T10:00:00Z'),
                return_date: null,
                user: null,
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: undefined,
            };

            jest.spyOn(rentalsRepository, 'findByUserIdAndMovieId').mockResolvedValue([rental1]);

            await expect(leaseTermValidationService.execute(user_id, movie_id, rental_date)).rejects.toThrow(
                new HttpException(HttpStatusCode.CONFLICT, 'You cannot rent the same movie within 48 hours!'),
            );

            expect(rentalsRepository.findByUserIdAndMovieId).toHaveBeenCalledWith(user_id, movie_id);
        });
    });

    describe('when there is a rental for the user and movie before 48 hours', () => {
        it('should not throw a conflict exception', async () => {
            const user_id = 'user_id';
            const movie_id = 'movie_id';
            const rental_date = new Date('2023-04-14T10:00:00Z');

            const rental1 = {
                id: 'rental_id_1',
                user_id,
                movie_id,
                rental_date: new Date('2023-04-12T09:59:59Z'),
                return_date: null,
                user: null,
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: undefined,
            };

            jest.spyOn(rentalsRepository, 'findByUserIdAndMovieId').mockResolvedValue([rental1]);

            const rental = await leaseTermValidationService.execute(user_id, movie_id, rental_date);

            expect(rentalsRepository.findByUserIdAndMovieId).toHaveBeenCalledWith(user_id, movie_id);
            expect(rental).toEqual(rental1);
        });
    });
});    