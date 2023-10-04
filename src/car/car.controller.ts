import {
    Controller,
    Route,
    SuccessResponse,
    Get,
    Post,
    Body,
    Delete,
    Query,
    Put
} from 'tsoa';
import { CarService } from './car.service';
import { Car, instanceOfCar } from './car';
import { Error, instanceOfError } from '../error/error';

@Route('car')
export class CarController extends Controller {

    carService: CarService = new CarService;

    @SuccessResponse('200', 'OK')
    @Get()
    public async get(): Promise<Array<Car> | Error> {

        const cars: Array<Car> | Error = await this.carService.get();
        const status = Array.isArray(cars) ? 200 : 500;
        this.setStatus(status);

        return cars;
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public post(
        @Body() requestBody: Car
    ): Car | Error {

        const newCar: Car | Error = this.carService.post(requestBody);
        const status: number = instanceOfCar(newCar) ? 201 : 500;
        this.setStatus(status);

        return newCar;
    }

    @SuccessResponse('200', 'OK')
    @Delete()
    public delete(
        @Query() id: number
    ): Array<Car> | Error {

        const remainingCars: Array<Car> | Error = this.carService.remove(id);
        const status: number = instanceOfError(remainingCars) ? 500 : 200;
        this.setStatus(status);
        return remainingCars;
    }

    @SuccessResponse('200', 'OK')
    @Put()
    public update(
        @Query() id: number,
        @Body() requestBody: Car
    ): Car | Error {

        const updatedCar = this.carService.update(id, requestBody);
        const status: number = instanceOfError(updatedCar) ? 500 : 200;
        this.setStatus(status);
        return updatedCar;
    }
}
