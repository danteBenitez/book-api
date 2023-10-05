// @ts-check
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { envConfig } from "./src/config/env.js";

import authorRouter from "./src/routes/author.route.js";
import bookRouter from "./src/routes/book.routes.js";
import genreRouter from "./src/routes/genre.routes.js";
import { setupDatabase } from "./src/database/setup.js";
import { logRequests } from "./src/middleware/logging.js";
import { handleErrors } from "./src/middleware/handleErrors.js";

import fileUpload from "express-fileupload";

const app = express();

// Middleware personalizado
app.use(logRequests);

// Middleware de librerías
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    createParentPath: true,
    tempFileDir: "./tmp",
    abortOnLimit: true,
    // Tiempo de espera de 1 minuto
    uploadTimeout: 3600,
    debug: true,
  })
);

// Routes
app.use("/api/authors", authorRouter);
app.use("/api/books", bookRouter);
app.use("/api/genres", genreRouter);

// Manejador de errores
app.use(handleErrors);

app.listen(envConfig.PORT, async () => {
  await setupDatabase();
  console.log(`Servidor escuchando en http://localhost:${envConfig.PORT}`);
});
