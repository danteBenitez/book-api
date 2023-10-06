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

    const cover = req.files.cover;
    try {
        const created = await bookService.create({ 
            ...req.body,
        }, cover);

        res.status(201).json({
            message: 'Libro creado exitosamente',
            book: created
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function updateBook(req, res) {
    const { bookId } = req.params;
    /** @type {import('express-fileupload').UploadedFile} */
    const cover = req.files.cover;

    try {
        const found = await bookService.update(bookId, req.body, cover);

        if (!found) {
            return res.status(404).json({
                message: 'Libro no encontrado'
            })
        }

        res.status(200).json({
            message: 'Libro actualizado correctamente',
            book: found
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
            book: found
        })

    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}
