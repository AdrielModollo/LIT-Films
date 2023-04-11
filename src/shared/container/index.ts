import { container } from 'tsyringe'
import UsersRepository from '../../modules/api/infra/typeorm/repositories/UsersRepository'
import IUsersRepository from '../../modules/api/repositories/IUsersRepository'
import IAuthenticateRepository from '../../modules/api/repositories/IAuthenticateRepository'
import AuthenticateRepository from '../../modules/api/infra/typeorm/repositories/AuthenticateRepository'


container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<IAuthenticateRepository>(
    'AuthenticateRepository',
    AuthenticateRepository
)