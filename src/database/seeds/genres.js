import { genreService } from "../../services/genre.service.js"

const GENRES = [
    "Misterio",
    "Policial",
    "Ciencia Ficción"
]

export async function createDefaultGenres() {
    try {
        for (const genre of GENRES) {
            console.log("Creando género: ", genre);
            await genreService.create({
                description: genre
            });
        }
    } catch(err) {
        console.error("Error al crear géneros: ", err);
    }
}