// @ts-check
import { GenreModel } from "../models/Genre.js";

/**
 * Instance del modelo `Author`
 * @typedef {InstanceType<typeof GenreModel>} GenreType
 */
/**
 * Servicio que abstrae las operaciones con los datos del género
 * de los modelos. Permite obtener, crear, borrar y eliminar géneros
 */
export class GenreService {
  /** @type {typeof GenreModel} */
  genreModel;

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link AuthorModel}
   * @param {typeof GenreModel} genreModel
   */
  constructor(genreModel) {
    this.genreModel = genreModel;
  }

  /**
   * Retorna un arreglo de todos los géneros
   *
   * @returns {Promise<GenreType[]>}
   */
  async findAll() {
    return this.genreModel.find();
  }

  /**
   * Encuentra un género por ID
   *
   * @param {number} id
   * @returns {Promise<GenreType | null>}  El género encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.genreModel.findById(id);
  }

  /**
   * Crea un género con los atributos especificados.
   *
   * @param {{
   *    description: string
   * }} genreData - Los datos del género a crear
   * @returns {Promise<GenreType | null>} El género creado
   */
  async create({ description }) {
    const exists = await this.genreModel.findOne({ description }).exec();
    if (exists) {
      return null;
    }
    const created = await this.genreModel.create({
      description,
    });

    return created;
  }

  /**
   * Actualiza el género especificado
   * con los atributos pasados.
   *
   * @param {number} genreId
   * @param {{
   *    description: string
   * }} genreData Los datos del género a crear
   * @returns {Promise<GenreType | null>} El género actualizado
   */
  async update(genreId, genreData) {
    let existingGenre = await this.findById(genreId);
    if (!existingGenre) {
      return null;
    }
    existingGenre = Object.assign(existingGenre, genreData);
    await existingGenre.save();

    return existingGenre;
  }

  /**
   * Elimina el género con el ID especificado
   *
   * @param {number} genreId
   * @returns {Promise<GenreType | null>} El género eliminado
   */
  async delete(genreId) {
    let existingGenre = await this.findById(genreId);
    if (!existingGenre) {
      return null;
    }
    await existingGenre.deleteOne();
    return existingGenre;
  }

  /**
   * Calcula la cantidad de libros por cada género
   *
   * @returns {Promise<(object & { bookCount: number })[]>}
   */
  async getBookCount() {
    return this.genreModel.aggregate([
      {
        $lookup: {
          from: "books",
          foreignField: "genreId",
          localField: "_id",
          as: "books",
        },
      },
      {
        $project: {
          _id: 1,
          description: 1,
          bookCount: { $size: "$books" },
        },
      },
    ]);
  }

  /**
   * Retorna un arreglo de objetos con información del género
   * y los libros que pertenecen a él
   *
   * @returns {Promise<unknown[]>}
   */
  async getBooksByGenre() {
    return this.genreModel.aggregate([
      {
        $lookup: {
          from: "books",
          let: {
            genreId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$genreId", "$$genreId"],
                },
              },
            },
            {
              $lookup: {
                from: "authors",
                localField: "authorId",
                foreignField: "_id",
                as: "author",
              },
            },
            {
              $lookup: {
                from: "genres",
                foreignField: "_id",
                localField: "genreId",
                as: "genre",
              },
            },
            {
              $addFields: {
                authorId: { $arrayElemAt: ["$author", 0] },
                genreId: { $arrayElemAt: ["$genre", 0] },
              },
            },
            {
              $project: {
                author: 0,
                genre: 0,
              },
            },
          ],
          as: "books",
        },
      },
    ]);
  }
}

export const genreService = new GenreService(GenreModel);
