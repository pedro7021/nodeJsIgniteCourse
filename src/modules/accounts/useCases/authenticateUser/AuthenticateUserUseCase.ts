import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }
        const token = sign({}, "sdfasdfdsfasd", {
            subject: user.id,
            expiresIn: "1d",
        });

        return {
            token,
            user: { name: user.name, email: user.email },
        };
    }
}

export { AuthenticateUserUseCase };
