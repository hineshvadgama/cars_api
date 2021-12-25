import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './tsoa/routes';

function run() {
    
    dotenv.config();

    const app: Express = express();
    const PORT = process.env.PORT ? process.env.PORT : 3000;

    app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
        return res.send(
            swaggerUi.generateHTML(await import("./tsoa/swagger.json"))
        );
    });

    RegisterRoutes(app);

    app.get('/', (req: Request, res: Response) => {
        res.send('<h1>Cars API</h1>');
    });

    app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}

run();
