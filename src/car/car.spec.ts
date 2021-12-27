import path from 'path';
import { readFile } from '../storage';
import fs from 'fs';
import request from "supertest";
import { app } from '../../index';
import { Error } from '../error/error';

const pathToFile: string = path.resolve('src/car', 'car.data.json');

describe('car', () => {

    let fileData: string | Error | null;

    beforeEach(() => {
        fileData = readFile(pathToFile);
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
});
