import User from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/users/ICreateUserDTO';
import { IUpdateUserDTO } from '../dtos/users/IUpdateUserDTO';

export default interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User | undefined>;
    updateUsers(id: string, data: Partial<IUpdateUserDTO>): Promise<User | undefined>;
    softDeleteByEmail(email: string): Promise<User | undefined>;
}


