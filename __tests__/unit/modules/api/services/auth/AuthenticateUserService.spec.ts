import AuthenticateUserService from "../../../../../../src/modules/api/services/auth/AuthenticateUserService";
import { HttpException, HttpStatusCode } from "../../../../../../src/shared/exceptions/HttpException";
import MockAuthenticateRepository from "../../../../repositories/MockAuthenticateRepository";

describe("AuthenticateUserService", () => {
    let authenticateUserService: AuthenticateUserService;
    let mockAuthenticateRepository: MockAuthenticateRepository;

    beforeEach(() => {
        mockAuthenticateRepository = new MockAuthenticateRepository();
        authenticateUserService = new AuthenticateUserService(mockAuthenticateRepository);
    });

    it("should authenticate a user successfully", async () => {
        const email = "johndoe@example.com";
        const password = "123456";

        const response = await authenticateUserService.execute({ email, password });

        expect(response).toHaveProperty("user");
        expect(response).toHaveProperty("token");
    });

    it("should not authenticate a user with incorrect password", async () => {
        const email = "johndoe@example.com";
        const password = "wrong_password";

        await expect(authenticateUserService.execute({ email, password })).rejects.toThrowError(HttpException);
        await expect(authenticateUserService.execute({ email, password })).rejects.toThrowError(
            new HttpException(HttpStatusCode.UNAUTHORIZED, "Incorrect email/password combination")
        );
    });

    it("should not authenticate a non-existent user", async () => {
        const email = "non_existent_user@example.com";
        const password = "123456";

        await expect(authenticateUserService.execute({ email, password })).rejects.toThrowError(HttpException);
        await expect(authenticateUserService.execute({ email, password })).rejects.toThrowError(
            new HttpException(HttpStatusCode.NOT_FOUND, "User not found")
        );
    });
});