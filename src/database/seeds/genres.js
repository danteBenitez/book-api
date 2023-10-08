import { genreService } from "../../services/genre.service.js";

const GENRES = [
  "Misterio",
  "Policial",
  "Ciencia Ficción",
  "Ficción",
  "No ficción",
  "Misterio",
  "Ciencia ficción",
  "Romance",
  "Aventura",
  "Fantasía",
  "Historia",
  "Biografía",
  "Poesía",
  "Autoayuda",
  "Terror",
  "Humor",
  "Política",
  "Crimen",
];

export async function createDefaultGenres() {
  try {
    for (const genre of GENRES) {
      console.log("Creando género: ", genre);
      await genreService.create({
        description: genre,
      });
    }
  } catch (err) {
    console.error("Error al crear géneros: ", err);
  }
}
