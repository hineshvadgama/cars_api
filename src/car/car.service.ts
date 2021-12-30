import { Car } from './car';
import { readFile, addToFile, removeFromFile, updateFile } from '../storage';
import path from 'path';
import { Error } from '../error/error';
import axios from 'axios';

export class CarService {

    pathToFile: string = path.resolve('src/car', 'car.data.json');

    public async get(): Promise<Array<Car> | Error> {

        const cars: string | Error = readFile(this.pathToFile);
        if (typeof (cars) === 'string') return await this.addSimilarModelWords(JSON.parse(cars));
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

    public remove(id: number): Array<Car> | Error {

        const remainingCars = removeFromFile(this.pathToFile, id);
        if (typeof(remainingCars) === 'string') return JSON.parse(remainingCars);
        return remainingCars;
    }

    public update(id: number, carProperties: Car): Car | Error {
        return updateFile(this.pathToFile, id, carProperties);
    }

    private async addSimilarModelWords(carsArray: Array<Car>): Promise<Array<Car> | Error> {

        for (let i = 0; i < carsArray.length; i++) {

            let similarWords: string = '';

            try {
                const response = await axios.get(`https://api.datamuse.com/words?sl=${carsArray[i].model}&max=6`);
                
                // Remove the first word as it's always the same as the provided word
                response.data.shift();

                let counter = 1;
                response.data.forEach((word: any) => {
                    similarWords = (counter === 1) ? `${word.word}` : `${word.word}, ${similarWords}`;
                    counter++;
                });
                carsArray[i].similarModelWords = similarWords;
            }
            catch(error) {
                return {
                    success: false,
                    message: `Failed to get similar models to ${carsArray[i].model}`,
                    error: error
                }
            }
        }
        return carsArray;
    }
}
