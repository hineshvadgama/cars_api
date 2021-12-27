import { Car } from './car';
import { readFile, addToFile } from '../storage';
import path from 'path';
import { Error } from '../error/error';

export class CarService {

    pathToFile: string = path.resolve('src', 'car.data.json');

    public get(): Array<Car> | Error {

        const cars: string | Error = readFile(this.pathToFile);
        if (typeof (cars) === 'string') return JSON.parse(cars);
        return cars;
    }

    public post(car: Car): Car | Error {

        const newCar: Car = {
            id: Date.now(),
            make: car.make,
            model: car.model,
            colour: car.colour,
            year: car.year
        }

        return addToFile(this.pathToFile, newCar);
    }
}
