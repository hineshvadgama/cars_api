import {
    Controller,
    Route,
    SuccessResponse,
    Get,
    Post,
    Body
} from 'tsoa';
import { CarService } from './car.service';
import { Car, instanceOfCar } from './car';
import { Error } from '../error/error';

@Route('car')
export class CarController extends Controller {

    @SuccessResponse('200', 'OK')
    @Get()
    public get(): Array<Car> | Error {

        const carService = new CarService;
        const cars: Array<Car> | Error = carService.get();
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
        const status = instanceOfCar(newCar) ? 201 : 500;
        this.setStatus(status);

        return newCar;
    }
}
