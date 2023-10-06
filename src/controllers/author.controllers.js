// @ts-check
import { authorService } from "../services/author.service.js";

export async function getAllAuthors(_req, res) {
    try {
        const found = await authorService.findAll();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'No hay autores que mostrar'
            })
        }

        res.status(200).json({
            authors: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export async function getAuthor(req, res) {
    const { authorId } = req.params;

    try {
        const found = await authorService.findById(authorId);

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró al autor'
            })
        }

        res.status(200).json({
            author: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }

}

export async function createAuthor(req, res) {
    try {
        const created = await authorService.create(req.body);
        res.status(201).json({
            message: 'Autor creado exitosamente',
            author: created
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function updateAuthor(req, res) {
    const { authorId } = req.params;
    try {
        const found = await authorService.update(authorId, req.body);

        if (!found) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            })
        }

        res.status(200).json({
            message: 'Autor actualizado correctamente',
            author: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function deleteAuthor(req, res) {
    const { authorId } = req.params;

    try {
        const found = await authorService.delete(authorId);

        if (!found) {
            return res.status(404).json({
                message: 'Autor no encontrado'
            })
        }

        res.status(200).json({
            message: 'Autor borrado correctamente',
            author: found
        })

    } catch(err) {
        res.sendstatus(500);
    }
}
