// @ts-check
import { body, checkExact } from 'express-validator';
import { authorService } from '../services/author.service.js';

/** @type {import('express-validator').CustomValidator} */
const checkForExistingNameAndSurname = async (value, { req } ) => {
    const { name, surname } = req;
    const match = await authorService.exists({
        name,
        surname
    });
    if (match) {
        throw new Error('Un usuario con este nombre ya existe')
    }
    return true;
}

const commonSchemaOptions = {
    validateName: [
        body('name')
            .exists().withMessage('Un autor debe tener un nombre')
            .isString().withMessage('El nombre del autor debe ser un string')
            .notEmpty().withMessage('El nombre del autor no puede estar vacío'),
    ],
    validateSurname: [
        body('surname')
            .exists().withMessage('Un autor debe tener un apellido')
            .isString().withMessage('El apellido del autor debe ser un string')
            .notEmpty({
                ignore_whitespace: true
            }).withMessage('El apellido del autor no puede estar vacío')
            .custom(checkForExistingNameAndSurname),
    ],
    validateBio: [
        body('bio')
            .exists().withMessage('Un autor necesita una biografía')
            .isString().withMessage('La biografía debe ser un string')
            .notEmpty({
                ignore_whitespace: true
            }).withMessage('La biografía no puede estar vacía')
    ],
}

export const createAuthorSchema = checkExact([
    ...commonSchemaOptions.validateName,
    ...commonSchemaOptions.validateSurname,
    ...commonSchemaOptions.validateBio,
], {
    message: 'Campos desconocidos en el cuerpo. Intente otra vez eliminando los campos de más'
});

export const updateAuthorSchema = createAuthorSchema;
