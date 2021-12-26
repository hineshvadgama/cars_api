import { Car } from './car';

export class CarService {

    public get(): Car {

        // Get from storage later on
        const car: Car = {
            make: 'Renault',
            model: 'Megane',
            colour: 'Yellow',
            year: 2021
        }

        return car;
    }

    public post(car: Car): Car {

        // Post to storage later on
        return car;
    }
}
