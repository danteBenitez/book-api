import { connectToDB } from "./config.js";
import "../models/Genre.js";
import { createDefaultGenres } from "./seeds/genres.js";

export async function setupDatabase() {
  await connectToDB()
    .then(async () => console.log("Se conectó a la base de datos exitosamente"))
    .catch(console.error);

  await createDefaultGenres();
}
