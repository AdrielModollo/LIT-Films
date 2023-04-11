import User from "../infra/typeorm/entities/User";

export interface IResponse {
    user: User;
    token: string;
}