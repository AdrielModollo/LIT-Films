import User from '../infra/typeorm/entities/User';

export default interface IAuthenticateRepository {
    findByEmail(email: string): Promise<User | undefined>;
}


