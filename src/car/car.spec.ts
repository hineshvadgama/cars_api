import path from 'path';
import { readFile } from '../storage';
import fs from 'fs';
import request from "supertest";
import { app } from '../../index';
import { Error } from '../error/error';
import { Car } from './car';

const pathToFile: string = path.resolve('src/car', 'car.data.json');

describe('car', () => {

    let fileData: string | Error | null;
    const initialCarId = 1640528728523;

    beforeEach(() => {

        fileData = readFile(pathToFile);

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

    afterEach(() => {

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

        // Get file data
        let fileData: string | Error = readFile(pathToFile);
        if (typeof (fileData) === 'string') fileData = JSON.parse(fileData);

        // Make request
        const response = await request(app).get('/car');

        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(fileData);
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

        // Assert data in initial state
        let getResponse = await request(app).get('/car');
        expect(getResponse.body).toEqual([{
            id: initialCarId,
            make: "Lancia",
            model: "Delta",
            colour: "Red",
            year: 1991
        }]);

        // Send request to change data
        const putResponse = await request(app).put(`/car?id=${initialCarId}`).send({
            make: 'Tesla',
            model: 'Model S',
            colour: 'White',
            year: 2021
        });
        expect(putResponse.body).toEqual({
            id: initialCarId,
            make: 'Tesla',
            model: 'Model S',
            colour: 'White',
            year: 2021
        });
        expect(putResponse.statusCode).toBe(200);

        // Confirm data has actually changed
        getResponse = await request(app).get('/car');
        expect(getResponse.body).toEqual([{
            id: initialCarId,
            make: 'Tesla',
            model: 'Model S',
            colour: 'White',
            year: 2021
        }]);
    });
});
