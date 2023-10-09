// @ts-check
import { check, body, checkExact } from "../middleware/validators.js";
import { authorService } from "../services/author.service.js";

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
      .withMessage("El ID de género debe ser un string")
      .isValidObjectId()
      .isValidGenreId(),
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
      .yearIsInThePast()
  ],
  validateAuthorId: [
    body("authorId")
      .exists()
      .withMessage("Debe proveer un ID de autor")
      .isString()
      .withMessage("El ID de autor debe ser un string")
      .isValidObjectId(),
    body("authorId")
      .custom(checkExistingAuthor)
      .withMessage("No se encontró al autor del libro"),
  ],
  validateISBN: [
    body("isbn")
      .exists()
      .withMessage("Un libro debe tener un ISBN")
      .isString().withMessage("El ISBN debe ser un string")
      .isISBN({
        version: "13"
      }).withMessage("Debe proveer un ISBN válido")
  ],
  validateLanguage: [
    body("language")
      .optional()
      .isString()
      .withMessage("El idioma del libro debe ser un string")
      .notEmpty().withMessage("El idioma no puede estar vacío")
  ],
  validatePageCount: [
    body("pageCount")
      .optional()
      .isNumeric().withMessage("El conteo de páginas debe ser un número")
      .isInt().withMessage("El conteo de páginas debe ser un número entero")
      .toInt()
  ]
};

export const createBookSchema = checkExact(
  [
    ...commonSchemaOptions.validateTitle,
    ...commonSchemaOptions.validatePublicationYear,
    ...commonSchemaOptions.validateGenreId,
    ...commonSchemaOptions.validateAuthorId,
    ...commonSchemaOptions.validateLanguage,
    ...commonSchemaOptions.validateISBN,
    ...commonSchemaOptions.validatePageCount
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
    ...commonSchemaOptions.validateGenreId,
    ...commonSchemaOptions.validateAuthorId,
    ...commonSchemaOptions.validateLanguage,
    ...commonSchemaOptions.validateISBN,
    ...commonSchemaOptions.validatePageCount
  ],
  {
    message:
      "Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más",
  }
);
