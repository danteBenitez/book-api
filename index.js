import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { envConfig } from './src/config/env.js';

import userRouter from './src/routes/user.routes.js'
import authRouter from './src/routes/auth.routes.js';
import { setupDatabase } from './src/database/setup.js';
import { logRequests } from './src/middleware/logging.js';
import { handleErrors } from './src/middleware/handleErrors.js';

const app = express();

// Middleware personalizado
app.use(logRequests);

// Middleware de librerías
app.use(express.json());
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/users', userRouter);
app.use('/auth', authRouter);

app.get('/error', () => { throw new Error("Oops!") })

// Manejador de errores
app.use(handleErrors);

app.listen(envConfig.PORT, async () => {
    await setupDatabase();
    console.log(`Servidor escuchando en http://localhost:${envConfig.PORT}`);
})
