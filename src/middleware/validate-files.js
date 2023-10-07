// @ts-check

/**
 * Función auxiliar que valida la existencia de uno o más
 * archivos en req.files. 
 * 
 * @param {string[]} filenames Los nombres de los archivos
 * a chequear
 * @param {string} errorMessage El mensaje de error
 * a enviar de no encontrarse
 * @returns {import('express').RequestHandler} Middleware
 * que valida la existencia de los archivos.
 * Responde con un error 400 de no encontrarse.
 */
export function checkForFilenames(filenames, errorMessage) {
    return (req, res, next) => {
        try {
            if (!req.files) {
                throw {
                    message: errorMessage
                }
            }

            const files = Object.keys(req.files);
            for (const filename of filenames) {
                if (filenames.includes(filename)) continue;
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