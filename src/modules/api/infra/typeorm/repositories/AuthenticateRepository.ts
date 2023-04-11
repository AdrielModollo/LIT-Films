import { getRepository, Repository } from "typeorm";
import User from "../entities/User";
import IAuthenticateRepository from "../../../repositories/IAuthenticateRepository";


class AuthenticateRepository implements IAuthenticateRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }
}

export default AuthenticateRepository;
