import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './tsoa/routes';
import helmet from 'helmet';

export const app: Express = express();

function run() {
    
    dotenv.config();

    const PORT = process.env.PORT ? process.env.PORT : 3000;

    // Basic security
    app.use(helmet());

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
