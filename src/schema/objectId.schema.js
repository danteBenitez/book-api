// @ts-check
import { check } from 'express-validator';
import { isValidObjectId } from 'mongoose';

/** 
 * Validación personalizada que chequea que una petición
 * contenga, en algunos de su campos, la clave pasada como 
 * parámetro, y que ésta sea un ObjectId de mongoose
 * 
 * @param {string} fieldName Clave a buscar dentro del cuerpo
 * @returns {import('express-validator').ValidationChain} Cadena
 * de validaciones de express-validator a utilizar
 */
export const hasValidObjectId = (fieldName) => 
  check(fieldName)
  .exists()
  .isString()
  .withMessage("Debe proveer un ID de libro como string")
  .custom(isValidObjectId).withMessage('El ID debe ser un ObjectId válido');