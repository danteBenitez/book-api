import { genreService } from "../../services/genre.service"

const GENRES = [
    "Misterio",
    "Policial",
    "Ciencia Ficción"
]

export async function createDefaultGenres() {
    try {
        for (const genre of GENRES) {
            await genreService.create({
                description: genre
            });
        }
    } catch(err) {
        console.error("Error al crear géneros: ", err);
    }
}