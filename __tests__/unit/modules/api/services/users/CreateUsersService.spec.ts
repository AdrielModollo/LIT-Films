import { CreateUserService } from "../../../../../../src/modules/api/services/users/CreateUsersService";
import { HttpException, HttpStatusCode } from "../../../../../../src/shared/exceptions/HttpException";
import MockUsersRepository from "../../../../repositories/MockUsersRepository";

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let mockUsersRepository: MockUsersRepository;

  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    createUserService = new CreateUserService(mockUsersRepository);
  });

  it('should create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
    expect(user.email).toBe('johndoe@example.com');
    expect(user.password).not.toBe('123456');
  });

  it('should not create a new user if email is already used', async () => {
    const existingUser = await mockUsersRepository.create({
      name: 'Existing User',
      email: 'existinguser@example.com',
      password: 'password',
    });

    await expect(createUserService.execute({
      name: 'John Doe',
      email: 'existinguser@example.com',
      password: '123456',
    })).rejects.toThrow(new HttpException(HttpStatusCode.CONFLICT, 'Email address already used.'));
  });
});
