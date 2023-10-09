/**
 * Función que comprueba si un archivo es una imagen,
 * según su tipo MIME.
 * 
 * @param {import('express-fileupload').UploadedFile} file
 * @returns {boolean}
 */
export function isImage(file) {
    return file.mimetype.startsWith('image');
}