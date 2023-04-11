import { GetAllUsersService } from "../../../../../../src/modules/api/services/users/GetAllUsersService";
import MockUsersRepository from "../../../../repositories/MockUsersRepository";

describe("GetAllUsersService", () => {
    it("should return an array of users", async () => {
        const mockUsersRepository = new MockUsersRepository();
        const getAllUsersService = new GetAllUsersService(mockUsersRepository);

        const users = await getAllUsersService.execute();

        expect(users).toHaveLength(2);
        expect(users[0]).toHaveProperty("id");
        expect(users[0]).toHaveProperty("name");
        expect(users[0]).toHaveProperty("email");
        expect(users[0]).toHaveProperty("password");
        expect(users[0]).toHaveProperty("created_at");
        expect(users[0]).toHaveProperty("updated_at");
        expect(users[0]).toHaveProperty("deleted_at");
        expect(users[1]).toHaveProperty("id");
        expect(users[1]).toHaveProperty("name");
        expect(users[1]).toHaveProperty("email");
        expect(users[1]).toHaveProperty("password");
        expect(users[1]).toHaveProperty("created_at");
        expect(users[1]).toHaveProperty("updated_at");
        expect(users[1]).toHaveProperty("deleted_at");
    });
});
