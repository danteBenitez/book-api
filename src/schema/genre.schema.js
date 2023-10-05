// @ts-check
import { body, checkExact } from "express-validator";
import { genreService } from "../services/genre.service.js";

/** @type {import('express-validator').CustomValidator} */
const checkExistingGenre = async (description) => {
    const existing = (await genreService.findAll()).map(g => g.description);
    const exists = existing.includes(description);
    if (exists) throw new Error('Ya existe un género con ese nombre');
    return true;
};


const commonSchemaOptions = {
  validateDescription: [
    body("description")
      .exists()
      .withMessage("Un género debe tener una descripción o nombre")
      .isString()
      .withMessage("La descripción debe ser un string")
      .notEmpty()
      .withMessage("La descripción no puede estar vacía"),
  ],
};

export const createGenreSchema = checkExact(
  [
    ...commonSchemaOptions.validateDescription,
  ],
  {
    message:
      "Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más",
  }
);

export const updateGenreSchema = checkExact([
    ...commonSchemaOptions.validateDescription,
],
  {
    message:
      "Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más",
  }
);
