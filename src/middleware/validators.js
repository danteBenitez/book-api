import { ExpressValidator, buildCheckFunction } from "express-validator";
import { isValidObjectId } from "mongoose";
import { genreService } from "../services/genre.service.js";

export const { check, body, checkExact, param, query } = new ExpressValidator({
  /**
   * Validación personalizada que chequea que una petición
   * contenga, en algunos de su campos, la clave pasada como
   * parámetro, y que ésta sea un ObjectId de mongoose
   *
   * @param {string} value El valor a verificar
   * @returns {Promise<boolean>}
   */
  isValidObjectId: async (value) => {
    if (!isValidObjectId(value)) {
      throw new Error("Debe enviar un ObjectId válido");
    }
    return true;
  },

  isValidGenreId: async (genreId) => {
    const validIds = (await genreService.findAll()).map((g) => g.id);
    if (!validIds.includes(genreId)) {
      throw new Error("ID de género no disponible");
    }
    return true;
  },

  yearIsInThePast: async (year) => {
    const isPast = year < new Date().getFullYear();
    if (!isPast) {
      throw new Error("El año debe ser pasado");
    }
    return true;
  },
});
