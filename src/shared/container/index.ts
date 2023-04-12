import { container } from 'tsyringe'
import IUsersRepository from '../../modules/api/repositories/IUsersRepository'
import IAuthenticateRepository from '../../modules/api/repositories/IAuthenticateRepository'
import IMoviesRepository from '../../modules/api/repositories/IMoviesRepository'
import UsersRepository from '../../modules/api/infra/typeorm/repositories/UsersRepository'
import AuthenticateRepository from '../../modules/api/infra/typeorm/repositories/AuthenticateRepository'
import MoviesRepository from '../../modules/api/infra/typeorm/repositories/MoviesRepository'


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IAuthenticateRepository>(
    'AuthenticateRepository',
    AuthenticateRepository
)

container.registerSingleton<IMoviesRepository>(
    'MoviesRepository',
    MoviesRepository
)