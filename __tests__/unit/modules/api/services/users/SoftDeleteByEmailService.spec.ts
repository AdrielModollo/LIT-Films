import { SoftDeleteByEmailService } from "../../../../../../src/modules/api/services/users/SoftDeleteByEmailService";
import MockUsersRepository from "../../../../repositories/MockUsersRepository";

describe("SoftDeleteByEmailService", () => {
    let service: SoftDeleteByEmailService;
    let usersRepository: MockUsersRepository;

    beforeEach(() => {
        usersRepository = new MockUsersRepository();
        service = new SoftDeleteByEmailService(usersRepository);
    });

    it("should be able to soft delete a user by email", async () => {
        const email = "test@example.com";
        const password = "password";
        await usersRepository.create({
            name: "Test User",
            email,
            password,
        });
        const deletedUser = await service.execute({ email });

        expect(deletedUser).toBeDefined();
        expect(deletedUser.email).toBe(email);
        expect(deletedUser.password).toBe(password);
        expect(deletedUser.deleted_at).not.toBeNull();
    });

    it("should throw an error if user is not found", async () => {
        const email = "nonexistent@example.com";

        await expect(service.execute({ email })).rejects.toThrow("User not found");
    });
});
