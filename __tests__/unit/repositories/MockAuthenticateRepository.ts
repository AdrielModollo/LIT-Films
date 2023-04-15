import IAuthenticateRepository from "../../../src/modules/api/repositories/IAuthenticateRepository";

class MockAuthenticateRepository implements IAuthenticateRepository {
    private users = [
        {
            id: "5fd7e009-14c2-4dd5-86e0-bb54677eb60f",
            name: "John Doe",
            email: "johndoe@example.com",
            password: "$2a$08$F6p3iClwJRyu4FURz4YFmOFnrhDa57IaeNLA8gbhhKp.ElbxHZyla",
            rentals: [],
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        }
    ];

    async findById(id: string) {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find((user) => user.email === email);
        return user;
    }
}

export default MockAuthenticateRepository;