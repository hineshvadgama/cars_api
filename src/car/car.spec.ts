import request from "supertest";
import { app } from '../../index';

describe('car', () => {

    it('GET', async () => {
        const response = await request(app).get('/car');
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({ make: 'Renault', model: 'Megane', colour: 'Yellow', year: 2021 });
    });
});
