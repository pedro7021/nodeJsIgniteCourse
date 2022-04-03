import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handle(resquest: Request, response: Response): Promise<Response> {
        const { id } = resquest.params;
        const { specifications_id } = resquest.body;
        const createCarSpecificationUseCase = container.resolve(
            CreateCarSpecificationUseCase
        );

        const car = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return response.json(car);
    }
}

export { CreateCarSpecificationController };
