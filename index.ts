import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

function run() {
    
    dotenv.config();

    const app: Express = express();
    const PORT = process.env.PORT ? process.env.PORT : 3000;

    app.get('/test', (req: Request, res: Response) => {
        res.json({ success: true, message: "Hello World!"});
    });

    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}

run();
