import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(24, "hours").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("should create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car",
            description: "Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            brand: "Brand",
            category_id: "Category",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "user_id",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "user_id",
            car_id: "car_id",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "user_id",
                car_id: "car_id2",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(
            new AppError("There's a rental in progress for this user")
        );
    });
    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            user_id: "user_1",
            car_id: "car_id",
            expected_return_date: dayAdd24Hours,
        });
        await expect(
            createRentalUseCase.execute({
                user_id: "user_2",
                car_id: "car_id",
                expected_return_date: dayAdd24Hours,
            })
        ).rejects.toEqual(new AppError("Car is unavailable"));
    });
    it("should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "user_1",
                car_id: "car_id",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(
            new AppError(
                "The rental must be at least 24 hours from the current date"
            )
        );
    });
});
