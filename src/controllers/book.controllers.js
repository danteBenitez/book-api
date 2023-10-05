// @ts-check
import { bookService } from "../services/book.service.js";

export async function getAllBooks(_req, res) {
    try {
        const found = await bookService.findAll();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'No hay libros que mostrar'
            })
        }

        res.status(200).json({
            books: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export async function getBook(req, res) {
    const { bookId } = req.params;

    try {
        const found = await bookService.findById(bookId);

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró el libro'
            })
        }

        res.status(200).json({
            book: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }

}

export async function createBook(req, res) {
    try {
        const created = await bookService.create(req.body);

        res.status(201).json({
            message: 'Libro creado exitosamente',
            user: created
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function updateBook(req, res) {
    const { bookId } = req.params;

    try {
        const found = await bookService.update(bookId, req.body);

        if (!found) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            })
        }

        res.status(200).json({
            message: 'Libro actualizado correctamente',
            user: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function deleteBook(req, res) {
    const { bookId } = req.params;


    try {
        const found = await bookService.delete(bookId);

        if (!found) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            })
        }

        res.status(200).json({
            message: 'Libro borrado correctamente',
            user: found
        })

    } catch(err) {
        res.sendstatus(500);
    }
}