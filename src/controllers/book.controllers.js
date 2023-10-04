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

export async function createUser(req, res) {
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

    if (bookId !== id) {
        return res.sendStatus(403);
    }

    try {

        const found = await bookService.update(bookId, req.body);

        if (!found) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function deleteUser(req, res) {
    const { userId } = req.params;
    const { id }  = req.user;

    if (userId !== id) {
        return res.sendStatus(403);
    }

    try {
        const found = await userService.findById(userId);

        if (!found) {
            return res.status(404).json({
                message: 'usuario no encontrado'
            })
        }
        await found.destroy();

        res.status(200).json({
            message: 'Usuario borrado correctamente',
            user: found
        })

    } catch(err) {
        res.sendstatus(500);
    }
}

export async function getUserInfoByToken(req, res) {
    return res.status(200).json({
        user: req.user
    })
}
