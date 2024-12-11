import * as express from "express";
import { Request, Response } from 'express';
import todoRouter from './TODO';

const app = express();
const port: number = 5000;

app.use(express.json());  // Using Express built-in body-parser

app.use('/tasks', todoRouter);

app.get('/', (req: Request, res: Response): void => {  // Typing req and res
    console.log('[GET ROUTE]');
    res.send('HELLO FROM HOMEPAGE');
});

// Start the server on the specified port
app.listen(port, (): void => console.log(`Server is running on port: http://localhost:${port}`));
