import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;
        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );
        console.log(authenticateUserUseCase);

        const token = await authenticateUserUseCase.execute({
            email,
            password,
        });
        console.log(token);
        return response.json(token);
    }
}

export { AuthenticateUserController };
