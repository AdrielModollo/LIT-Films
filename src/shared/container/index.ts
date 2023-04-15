import { container } from 'tsyringe';
import IUsersRepository from '../../modules/api/repositories/IUsersRepository';
import IAuthenticateRepository from '../../modules/api/repositories/IAuthenticateRepository';
import UsersRepository from '../../modules/api/infra/typeorm/repositories/UsersRepository';
import AuthenticateRepository from '../../modules/api/infra/typeorm/repositories/AuthenticateRepository';
import IRentalsRepository from '../../modules/api/repositories/IRentalsRepository';
import RentalsRepository from '../../modules/api/infra/typeorm/repositories/RentalsRepository';
import { LeaseTermValidationService } from '../../modules/api/services/rentals/LeaseTermValidationService';
import { SearchMovieIdService } from '../../modules/api/services/movies/SearchMovieIdService';
import { CreateRentalService } from '../../modules/api/services/rentals/CreateRentalService';

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IAuthenticateRepository>(
    'AuthenticateRepository',
    AuthenticateRepository
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);

container.registerSingleton<LeaseTermValidationService>(
    'LeaseTermValidationService',
    LeaseTermValidationService
);

container.registerSingleton<SearchMovieIdService>(
    'SearchMovieIdService',
    SearchMovieIdService,
);

container.registerSingleton<CreateRentalService>(
    'CreateRentalService',
    CreateRentalService,
);
