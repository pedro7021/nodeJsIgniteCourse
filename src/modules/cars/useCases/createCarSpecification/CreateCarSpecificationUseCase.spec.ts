import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
describe("Create Car Specification Use Case", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });
    it("should not be able to add a new specification to inexistent car", async () => {
        const car_id = "car_id";
        const specifications_id = ["specification_id"];
        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });
    it("should be able to add a new specification to a given car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Description",
            daily_rate: 100,
            license_plate: "abcde",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });

        const specification = await specificationRepositoryInMemory.create({
            name: "Air Conditioning",
            description: "Air Conditioning",
        });
        const specifications_id = [specification.id];

        const specificationsCar = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications).toHaveLength(1);
    });
});
