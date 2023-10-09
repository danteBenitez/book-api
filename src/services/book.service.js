import path from "path";
import { BookModel } from "../models/Book.js";
import { authorService as authorServiceInstance } from "./author.service.js";
import { rm } from "fs/promises";
import mongoose from "mongoose";

const UPLOAD_PATH = path.resolve("./uploads");

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
   * @returns {Promise<BookType | null>}  El libro encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.bookModel.findById(id);
  }

  /**
   * Crea un libro con los atributos especificados.
   *
   * @param {} bookData - Los datos del libro a crear
   * @param {import('express-fileupload').UploadedFile} cover
   * El archivo de la portada del libro
   * @returns {Promise<BookType | null>} El libro creado
   */
  async create({ authorId, ...book }, cover) {
    const author = await this.authorService.findById(authorId);

    if (!author) {
      return null;
    }

    const objectId = new mongoose.Types.ObjectId()

    /** @type {Promise<BookType | null>} */
    const bookPromise = new Promise(async (resolve) => {
      const created = await this.bookModel.create({
        _id: objectId,
        authorId,
        coverImagePath: `${objectId}-${cover.name}`,
        ...book,
      });

      cover.mv(path.join(UPLOAD_PATH, `${created.coverImagePath}`), async (err) => {
          if (err)  {
            console.error("Ocurrió un error al subir el archivo: ", err);
            resolve(null);
          }

        const newAuthor = await this.authorService.addBookIdToAuthor(author, created);
        created.authorId = newAuthor;
        resolve(created);
      });
    });
    return bookPromise;
  }

  /**
   * Actualiza el libro especificado
   * con los atributos pasados.
   *
   * @param {number} bookId
   * @param {} bookData Los datos del libro a crear
   * @param {import('express-fileupload').UploadedFile} cover
   * El archivo de la portada del libro
   * @returns {Promise<BookType | null>} El libro actualizado
   * o un null si algo salió mal
   */
  async update(bookId, bookData, cover) {
    let existingBook = await this.findById(bookId);

    if (!existingBook) {
      return null;
    }
    await rm(path.join(UPLOAD_PATH, `${existingBook.coverImagePath}`));
    /** @type {Promise<BookType | null>} */
    const updatePromise = new Promise((resolve) => {
      cover.mv(path.join(UPLOAD_PATH, `${bookId}-${cover.name}`), async (err) => {
          if (err)  {
            console.error("Ocurrió un error al subir el archivo: ", err);
            resolve(null);
          }

          existingBook = Object.assign(existingBook, { 
            ...bookData,
            coverImagePath: `${bookId}-${cover.name}`
          });
          await existingBook.save();

        resolve(existingBook);
      });
    });
    return updatePromise;
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

    try {
      await rm(path.join(UPLOAD_PATH, existingBook.coverImagePath));
    } catch(err) {
      console.error("Error al eliminar archivo: ", err);
    }
    const author = await this.authorService.findById(existingBook.authorId);

    await this.authorService.removeBookFromAuthor(author, bookId);
    await existingBook.deleteOne();
    return existingBook;
  }
}

export const bookService = new BookService(BookModel, authorServiceInstance);
