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

    @SuccessResponse('200', 'OK')
    @Get()
    public async get(): Promise<Array<Car> | Error> {

        const carService = new CarService;
        const cars: Array<Car> | Error = await carService.get();
        const status = Array.isArray(cars) ? 200 : 500;
        this.setStatus(status);

        return cars;
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public post(
        @Body() requestBody: Car
    ): Car | Error {

        const carService = new CarService;
        const newCar: Car | Error = carService.post(requestBody);
        const status: number = instanceOfCar(newCar) ? 201 : 500;
        this.setStatus(status);

        return newCar;
    }

    @SuccessResponse('200', 'OK')
    @Delete()
    public delete(
        @Query() id: number
    ): Array<Car> | Error {

        const carService = new CarService;
        const remainingCars: Array<Car> | Error = carService.remove(id);
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

        const carService = new CarService;
        const updatedCar = carService.update(id, requestBody);
        const status: number = instanceOfError(updatedCar) ? 500 : 200;
        this.setStatus(status);
        return updatedCar;
    }
}
