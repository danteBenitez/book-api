import { createWriteStream } from "fs";
import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";

const streams = {};

const getFormattedDate = (date) => {
  // Formato: YYYY-mm-dd
  return date.toISOString().slice(0, 10);
};
export async function getStreamForLogFile(logFolder, suffix) {
  const date = getFormattedDate(new Date());
  const dir = join(logFolder, `${suffix}`);
  // Crear una carpeta con el acceso especificado,
  await mkdir(dir, {
    // Se crea `logs` de no existir,
    // y la creación se pasa por alto si la carpeta existe
    recursive: true,
  });

  const lastStream = streams[suffix];
  const filepath = join(dir, `${date}-${suffix}.log`);

  try {
    const _stats = await stat(filepath);

    if (lastStream) return lastStream;
  } catch (err) {
    if (err.code == "ENOENT") {
      await writeFile(filepath, "");
    } else {
      throw new Error("Error inesperado al generar archivo de logs");
    }
  }

  streams[suffix] = createWriteStream(filepath, {
    flags: "a",
  });
  return streams[suffix];
}
