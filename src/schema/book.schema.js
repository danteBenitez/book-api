// @ts-check
import { check, body, checkExact } from "express-validator";
import { genreService } from "../services/genre.service.js";
import { authorService } from "../services/author.service.js";
import { hasValidObjectId } from "./objectId.schema.js";

/** @type {import('express-validator').CustomValidator} */
const checkForValidGenreId = async (genreId) => {
  const validIds = (await genreService.findAll()).map((g) => g.id);
  if (!validIds.includes(genreId)) {
    throw new Error("ID de género no disponible");
  }
  return true;
};


/** @type {import('express-validator').CustomSanitizer } */
const isInThePast = async (year) => {
  const isPast = year < new Date().getFullYear();
  if (!isPast) {
    throw new Error("El año de publicación debe ser pasada");
  }
  return true;
};

/** @type {import('express-validator').CustomValidator} */
const checkExistingAuthor = async (authorId) => {
  const exists = await authorService.findById(authorId);
  if (!exists) throw new Error("El autor no existe");
  return true;
};

const commonSchemaOptions = {
  validateTitle: [
    body("title")
      .exists()
      .withMessage("Un libro debe tener un título")
      .isString()
      .withMessage("El título debe ser un string")
      .notEmpty()
      .withMessage("El título no puede estar vacío"),
  ],
  validateGenreId: [
    body("genreId")
      .exists()
      .withMessage("Un libro debe tener un ID de género")
      .isString()
      .withMessage("El ID de género debe ser un string"),
    hasValidObjectId("genreId"),
    body("genreId").custom(checkForValidGenreId),
  ],
  validatePublicationYear: [
    body("publicationYear")
      .exists()
      .withMessage("Un libro necesita un año de publiación")
      .isNumeric()
      .withMessage("El año de publicación debe ser un número")
      .isInt()
      .withMessage("El año de publicación debe ser un entero")
      .toInt()
      .notEmpty({
        ignore_whitespace: true,
      })
      .custom(isInThePast),
  ],
  validateCoverImage: [
    check("files")
      .custom((_, { req }) => {
        const files = req.files;
        if (!files) throw new Error("Debe enviar una imagen de portada");
      })
      // Evitar seguir con la validación si no hay imágenes de archivos
      .bail()
      .customSanitizer((_, { req }) => req.files)
      .exists()
      .withMessage("Debe enviar una imagen de portada")
      .customSanitizer((files) => files.cover)
      .exists()
      .withMessage("Necesita proveer una imagen de portada")
      .custom((cover) => {
        if (cover.mimetype.startsWith("image")) {
          return true;
        }
        throw new Error("Sólo puede subir imágenes de portada");
      })
      .customSanitizer((cover) => cover.name)
      .exists()
      .isString()
      .notEmpty()
      .withMessage("El nombre de la imagen no puede estar vacío"),
  ],
  validateAuthorId: [
    body("authorId")
      .exists()
      .withMessage("Debe proveer un ID de autor")
      .isString()
      .withMessage("El ID de autor debe ser un string"),
    hasValidObjectId("authorId"),
    body("authorId")
      .custom(checkExistingAuthor)
      .withMessage("No se encontró al autor del libro"),
  ],
};

export const createBookSchema = checkExact(
  [
    ...commonSchemaOptions.validateTitle,
    ...commonSchemaOptions.validatePublicationYear,
    ...commonSchemaOptions.validateGenreId,
    ...commonSchemaOptions.validateCoverImage,
    ...commonSchemaOptions.validateAuthorId,
  ],
  {
    message:
      "Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más",
  }
);

export const updateBookSchema = checkExact(
  [
    ...commonSchemaOptions.validateTitle,
    ...commonSchemaOptions.validatePublicationYear,
    ...commonSchemaOptions.validateCoverImage,
    ...commonSchemaOptions.validateAuthorId,
  ],
  {
    message:
      "Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más",
  }
);
