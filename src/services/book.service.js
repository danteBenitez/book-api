// @ts-check
import { BookModel } from "../models/Book.js";
import { authorService as authorServiceInstance } from "./author.service.js";

/**
 * Instance del modelo `Author`
 * @typedef {InstanceType<typeof BookModel>} BookType
 */

/**
 * Servicio que abstrae las operaciones con los datos de los libros
 * de los modelos. Permite obtener, crear, borrar y eliminar libros 
 */
export class BookService {
  /** @type {typeof BookModel} */
  bookModel;
  /** @type {typeof authorServiceInstance} */
  authorService;

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link BookModel},
   * y otro acorde a la interfaz {@link AuthorModel}
   * @param {typeof BookModel} bookModel
   * @param {typeof authorServiceInstance} authorService
   */
  constructor(bookModel, authorService) {
    this.bookModel = bookModel;
    this.authorService = authorService;
  }

  /**
   * Retorna un arreglo de todos los libros
   *
   * @returns {Promise<BookType[]>}
   */
  async findAll() {
    return this.bookModel.find();
  }

  /**
   * Encuentra todos los libros por el ID de su Autor
   *
   * @param {number} authorId
   * @returns {Promise<BookType | null>}
   */
  async findByAuthorId(authorId) {
    return this.bookModel
      .findOne({
        authorId,
      })
      .exec();
  }

  /**
   * Encuentra un libro por ID
   *
   * @param {number} id
   * @returns {Promise< BookType | null>}  El libro encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.bookModel.findById(id);
  }

  /**
   * Crea un libro con los atributos especificados.
   *
   * @param {{
   *    title: string,
   *    genre: number,
   *    publicationYear: number,
   *    coverImageURL: string,
   *    authorId: number,
   * }} bookData - Los datos del libro a crear
   * @returns {Promise<BookType | null>} El libro creado
   */
  async create({ authorId, ...book }) {
    const exists = await this.authorService.findById(authorId);

    if (!exists) {
      return null;
    }

    const created = await this.bookModel.create({
      authorId,
      ...book,
    });

    return created;
  }

  /**
   * Actualiza el libro especificado
   * con los atributos pasados.
   *
   * @param {number} bookId
   * @param {{
   *    title: string,
   *    genre: number,
   *    publicationYear: number,
   *    coverImageURL: string,
   *    authorId: number,
   * }} bookData Los datos del libro a crear
   * @returns {Promise<BookType | null>} El libro actualizado
   * o un null si algo salió mal
   */
  async update(bookId, bookData) {
    let existingBook = await this.findById(bookId);

    if (!existingBook) {
      return null;
    }

    existingBook = Object.assign(existingBook, bookData);
    await existingBook.save();

    return existingBook;
  }

  /**
   * Elimina el libro con el ID especificado
   *
   * @param {number} bookId
   * @returns {Promise<BookType | null>} El libro elimina 
   * o un null si algo salió mal
   */
  async delete(bookId) {
    let existingBook = await this.findById(bookId);
    if (!existingBook) {
      return null;
    }
    await existingBook.deleteOne();
    return existingBook;
  }
}

export const bookService = new BookService(BookModel, authorServiceInstance);
