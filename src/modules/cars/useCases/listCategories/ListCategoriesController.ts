import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    handle(req: Request, res: Response): Response {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const all = listCategoriesUseCase.execute();
        return res.json(all);
    }
}

export { ListCategoriesController };
