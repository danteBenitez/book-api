// @ts-check

/**
 * Función auxiliar que valida la existencia de uno o más
 * archivos en req.files. 
 * 
 * @param {string[]} filenames Los nombres de los archivos
 * a chequear
 * @param {string} errorMessage El mensaje de error
 * a enviar de no encontrarse
 * @param {(...files: import('express-fileupload').UploadedFile[]) => boolean} [validation]
 * Una función que permite validar cada archivo. Recibe un array de archivos. Si retorna
 * verdadero, el arreglo de considera válido se considera válido.
 * @returns {import('express').RequestHandler} Middleware
 * que valida la existencia de los archivos.
 * Responde con un error 400 de no encontrarse.
 */
export function checkForFilenames(filenames, errorMessage, validation) {
    return (req, res, next) => {
        try {
            if (!req.files) {
                throw {
                    message: errorMessage
                }
            }
            const validateFn = validation ?? function() { return true; };

            for (const filename of filenames) {
                const file = req.files[filename][0] ?? req.files[filename];
                if (filenames.includes(filename) && validateFn(file)) {
                    continue;
                };
                throw {
                    message: errorMessage
                }
            }

            next();
        } catch(err) {
            res.status(400).json({
                errors: [{
                    path: filenames,
                    msg: errorMessage
                }]
            })
        }

    }
}