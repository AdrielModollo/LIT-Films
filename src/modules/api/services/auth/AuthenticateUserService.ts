import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IRequest } from "../../dtos/IRequestDTO";
import { IResponse } from "../../dtos/IResponseDTO";
import { HttpException, HttpStatusCode } from "../../../../shared/exceptions/HttpException";
import IAuthenticateRepository from "../../repositories/IAuthenticateRepository";

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("AuthenticateRepository")
    private authenticateRepository: IAuthenticateRepository
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.authenticateRepository.findByEmail(email);

    if (!user) {
      throw new HttpException(HttpStatusCode.NOT_FOUND, "User not found");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new HttpException(HttpStatusCode.UNAUTHORIZED, "Incorrect email/password combination");
    }

    const token = sign({}, "secret", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
