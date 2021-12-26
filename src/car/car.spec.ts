import request from "supertest";
import { app } from '../../index';

describe('car', () => {

    it('GET', async () => {
        const response = await request(app).get('/car');
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ make: 'Renault', model: 'Megane', colour: 'Yellow', year: 2021 });
    });

    it('POST', async () => {
        const response = await request(app).post('/car').send({
            make: 'Tesla',
            model: 'Model S',
            colour: 'White',
            year: 2021
        });
        expect(response.statusCode).toBe(201);
        expect(response.body).toStrictEqual({ make: 'Tesla', model: 'Model S', colour: 'White', year: 2021 });
    });
});
