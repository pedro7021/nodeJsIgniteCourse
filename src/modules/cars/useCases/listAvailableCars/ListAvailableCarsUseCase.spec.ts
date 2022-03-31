import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Description",
            daily_rate: 100,
            license_plate: "abcde",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Description",
            daily_rate: 100,
            license_plate: "abcde",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Brand",
        });

        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Description",
            daily_rate: 100,
            license_plate: "abcde",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: "Fusca",
        });

        expect(cars).toEqual([car]);
    });
    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "Description",
            daily_rate: 100,
            license_plate: "abcde",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Category",
        });

        expect(cars).toEqual([car]);
    });
});
