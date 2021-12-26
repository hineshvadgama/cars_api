import {
    Controller,
    Route,
    SuccessResponse,
    Get,
    Post,
    Body
} from 'tsoa';
import { CarService } from './car.service';
import { Car } from './car';

@Route('car')
export class CarController extends Controller {

    @SuccessResponse('200', 'OK')
    @Get()
    public get(): Car {
        const carService = new CarService;
        const car: Car = carService.get();
        this.setStatus(200);
        return car;
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public post(
        @Body() requestBody: Car
    ): Car {
        const carService = new CarService;
        const newCar: Car = carService.post(requestBody);
        this.setStatus(201);
        return newCar;
    }
}
