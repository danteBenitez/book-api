// @ts-check
import { AuthorModel } from "../models/Author.js";


/**
 * Instance del modelo `Author`
 * @typedef {InstanceType<typeof AuthorModel>} AuthorType 
 */
/**
 * Servicio que abstrae las operaciones con los datos del autor
 * de los modelos. Permite obtener, crear, borrar y eliminar autores
 */
export class AuthorService {
  /** @type {typeof AuthorModel} */
  authorModel;

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link AuthorModel}
   * @param {typeof AuthorModel} authorModel
   */
  constructor(authorModel) {
    this.authorModel = authorModel;
  }
  /**
   * Retorna un arreglo de todos los autores
   * 
   * @returns {Promise<AuthorType[]>}
   */
  async findAll() {
    return this.authorModel.find();
  }
  /**
   * Encuentra un autor por ID
   *
   * @param {number} id
   * @returns {Promise<AuthorType | null>}  El autor encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.authorModel.findById(id);
  }

  /**
   * Devuelve true si un autor existe con
   * los parámetros proporcionados y false en
   * caso contrario
   *
   * @param {{ 
   *  name: string, 
   *  surname: string 
   * }} attributes
   * @returns {Promise<boolean>}
   */
  async exists({ name, surname }) {
    const found = await this.authorModel.findOne({
      $or: [
        { name },
        { surname }
      ]
    }).exec()
    return found !== null;
  }

  /**
   * Crea un autor con los atributos especificados.
   *
   * @param {{
   *   name: string,
   *   surname: string,
   *   bio: string,
   * }} authorData - Los datos del autor a crear
   * @returns {Promise<AuthorType | null>} El autor creado o null
   * si hubo conflicts
   */
  async create({ name, surname, bio }) {
    const created = await this.authorModel.create({
      name,
      surname,
      bio
    });
    console.log(created);
    return created;
  }

  /**
   * Acutaliza el autor especificado
   * con los atributos pasados.
   *
   * @param {number} authorId
   * @param {{
   *  name: string,
   *  surname: string,
   *  bio: string
   * }} authorData Los datos del autor a crear
   * @returns {Promise<AuthorType | null>} El usuario actualizado
   * o un error representando qué salió mal
   */
  async update(authorId, authorData) {
    let existingAuthor = await this.findById(authorId);

    if (!existingAuthor) {
      return null;
    }

    existingAuthor = Object.assign(existingAuthor, authorData);
    await existingAuthor.save();

    return existingAuthor;
  }


  /**
   * Elimina el autor con el ID especificado
   *
   * @param {number} authorId 
   * @returns {Promise<AuthorType | null>} El autor eliminado
   * o un null si algo salió mal
   */
  async delete(authorId) {
    let existingAuthor = await this.findById(authorId);
    if (!existingAuthor) {
      return null;
    }
    await existingAuthor.deleteOne();
    return existingAuthor;
  }
}

export const authorService = new AuthorService(AuthorModel);