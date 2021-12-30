import path from 'path';
import { readFile } from '../storage';
import fs from 'fs';
import request from "supertest";
import { app } from '../../index';
import { Error } from '../error/error';
import { Car } from './car';
import axios from 'axios';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const pathToFile: string = path.resolve('src/car', 'car.data.json');

const axiosGetResponse = {
    data: [
        {
            word: "delta",
            score: 100,
            numSyllables: 2
        },
        {
            word: "dealt",
            score: 90,
            numSyllables: 1
        },
        {
            word: "delt",
            score: 90,
            numSyllables: 1
        },
        {
            word: "della",
            score: 90,
            numSyllables: 2
        },
        {
            word: "dela",
            score: 90,
            numSyllables: 2
        },
        {
            word: "deltas",
            score: 90,
            numSyllables: 2
        }
    ]
}

describe('car', () => {

    let fileData: string | Error;
    const initialCarId = 1640528728523;

    beforeAll(() => {
        // Save the current state of the file to fileData
        fileData = readFile(pathToFile);
    });

    beforeEach(() => {

        const testData: Array<Car> = [{
            id: initialCarId,
            make: "Lancia",
            model: "Delta",
            colour: "Red",
            year: 1991
        }];

        try {
            fs.writeFileSync(pathToFile, JSON.stringify(testData),
                {encoding: 'utf-8', mode: 0o666, flag: 'w'});
        }
        catch (error) {
            console.log(error);
        }
    });

    afterAll(() => {
        // Restore the file to it's state before the tests
        if (typeof(fileData) === 'string') {
            try {
                fs.writeFileSync(pathToFile, fileData, {encoding: 'utf-8', mode: 0o666, flag: 'w'});
            }
            catch (error) {
                console.log(error);
            }
        }
    });

    it('GET', async () => {

        mockAxios.get.mockResolvedValue(axiosGetResponse);

        const response = await request(app).get('/car');
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(
            [{
              id: 1640528728523,
              make: 'Lancia',
              model: 'Delta',
              colour: 'Red',
              year: 1991,
              similarModelWords: 'deltas, dela, della, delt, dealt'
            }]
        );
    });

    it('POST', async () => {

        const response = await request(app).post('/car').send({
            make: 'Tesla',
            model: 'Model S',
            colour: 'White',
            year: 2021
        });

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({ make: 'Tesla', model: 'Model S', colour: 'White', year: 2021 });
        expect(response.body.id).toBeDefined();
    });

    it('DELETE', async () => {

        const response = await request(app).delete(`/car?id=${initialCarId}`);    
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toEqual(0);

        const getResponse = await request(app).get('/car');
        expect(getResponse.body).toEqual([]);
    });

    it('PUT', async () => {

        const putResponse = await request(app).put(`/car?id=${initialCarId}`).send({
            make: 'Renault',
            model: 'Megane',
            colour: 'Yellow',
            year: 2021
        });

        expect(putResponse.statusCode).toBe(200);
        expect(putResponse.body).toEqual({
            id: initialCarId,
            make: 'Renault',
            model: 'Megane',
            colour: 'Yellow',
            year: 2021
        });
    });
});
