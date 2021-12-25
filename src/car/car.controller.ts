import {
    Controller,
    Route,
    SuccessResponse,
    Get
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
}
