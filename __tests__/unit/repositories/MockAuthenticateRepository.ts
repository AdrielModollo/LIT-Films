import IAuthenticateRepository from "../../../src/modules/api/repositories/IAuthenticateRepository";

class MockAuthenticateRepository implements IAuthenticateRepository {
    private users = [
        {
            id: "user-id",
            name: "John Doe",
            email: "johndoe@example.com",
            password: "$2a$08$F6p3iClwJRyu4FURz4YFmOFnrhDa57IaeNLA8gbhhKp.ElbxHZyla",
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }
    ];

    async findByEmail(email: string) {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
}

export default MockAuthenticateRepository;