import { UpdateUserService } from "../../../../../../src/modules/api/services/users/UpdateUsersService";
import { compare } from "bcryptjs";
import MockUsersRepository from "../../../../repositories/MockUsersRepository";


describe("UpdateUserService", () => {
    let service: UpdateUserService;
    let usersRepository: MockUsersRepository;

    beforeEach(() => {
        usersRepository = new MockUsersRepository();
        service = new UpdateUserService(usersRepository);
    });

    it("should be able to update a user's name and password", async () => {
        const email = "test@example.com";
        const password = "password";
        const newName = "New Name";
        const newPassword = "newpassword";
        const user = await usersRepository.create({
            name: "Test User",
            email,
            password,
        });

        const updatedUser = await service.execute({
            email,
            name: newName,
            password: newPassword,
        });

        expect(updatedUser).toBeDefined();
        expect(updatedUser.email).toBe(email);
        expect(updatedUser.name).toBe(newName);

        const passwordMatch = await compare(newPassword, updatedUser.password);
        expect(passwordMatch).toBe(true);
    });

    it("should throw an error if user is not found", async () => {
        const email = "nonexistent@example.com";
        const newName = "New Name";
        const newPassword = "newpassword";

        await expect(
            service.execute({
                email,
                name: newName,
                password: newPassword,
            })
        ).rejects.toThrow("User not found");
    });
});
