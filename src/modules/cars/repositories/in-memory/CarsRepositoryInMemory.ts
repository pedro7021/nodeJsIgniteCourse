import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === licensePlate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        return this.cars.filter((car) => {
            if (
                car.available === true ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id) ||
                (name && car.name === name)
            ) {
                return car;
            }
            return null;
        });
    }
    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }
    async updateAvailable(id: string, available: boolean): Promise<void> {
        const findIndex = this.cars.findIndex((car) => car.id === id);
        this.cars[findIndex].available = available;
    }
}

export { CarsRepositoryInMemory };
