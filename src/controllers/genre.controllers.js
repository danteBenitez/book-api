// @ts-check
import { genreService } from "../services/genre.service.js";

export async function getAllGenres(_req, res) {
    try {
        const found = await genreService.findAll();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'No hay géneros que mostrar'
            })
        }

        res.status(200).json({
            genres: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export async function getGenre(req, res) {
    const { genreId } = req.params;

    try {
        const found = await genreService.findById(genreId);

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró el género'
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

export async function createGenre(req, res) {
    try {
        const created = await genreService.create(req.body);

        res.status(201).json({
            message: 'Género creado exitosamente',
            genre: created
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function updateGenre(req, res) {
    const { genreId } = req.params;

    try {
        const found = await genreService.update(genreId, req.body);

        if (!found) {
            return res.status(404).json({
                message: 'Género no encontrado'
            })
        }

        res.status(200).json({
            message: 'Género actualizado correctamente',
            genre: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function deleteGenre(req, res) {
    const { genreId } = req.params;


    try {
        const found = await genreService.delete(genreId);

        if (!found) {
            return res.status(404).json({
                message: 'Género no encontrado'
            })
        }

        res.status(200).json({
            message: 'Género borrado correctamente',
            genre: found
        })

    } catch(err) {
        res.sendStatus(500);
    }
}

export async function getBookCount(_req, res) {
    try {
        const found = await genreService.getBookCount();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'Ningún genero encontrado'
            })
        }

        res.status(200).json({
            genre: found
        });

    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export async function getBooksByGenre(_req, res) {
    try {
        const found = await genreService.getBooksByGenre();

        if (found.length == 0) {
            return res.status(404).json({
                message: 'Géneros no encontrados'
            })
        }

        res.status(200).json({
            genres: found
        });

    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
}