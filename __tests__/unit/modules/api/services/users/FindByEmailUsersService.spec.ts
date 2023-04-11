import MockUsersRepository from "../../../../repositories/MockUsersRepository";
import { FindByEmailUsersService } from "../../../../../../src/modules/api/services/users/FindByEmailUsersService";

describe("FindByEmailUsersService", () => {
    let service: FindByEmailUsersService;
    let usersRepository: MockUsersRepository;

    beforeEach(() => {
        usersRepository = new MockUsersRepository();
        service = new FindByEmailUsersService(usersRepository);
    });

    it("should be able to find a user by email", async () => {
        const email = "test@example.com";
        const password = "password";
        await usersRepository.create({
            name: "Test User",
            email,
            password,
        });
        const foundUser = await service.execute(email);

        expect(foundUser).toBeDefined();
        expect(foundUser.email).toBe(email);
        expect(foundUser.password).toBe(password);
    });


    it("should throw an error if user is not found", async () => {
        const email = "nonexistent@example.com";

        await expect(service.execute(email)).rejects.toThrow("User not found");
    });
});
