import morgan from "morgan";
import { getStreamForLogFile } from "../utils/getStreamForLogFile.js";
import { envConfig } from "../config/env.js";

const LOGGING_DIR = envConfig.LOGGING_DIR;

async function logError(err, req) {
    const stream = await getStreamForLogFile(LOGGING_DIR, 'error');
    const dateToPrepend = `${new Date().toISOString()}`;
    const reqInfo = req.body;
    const errorOutput = `[${dateToPrepend}] ${err.message}-${err.stack}\nRequest Body: ${reqInfo}`;

    stream.write(errorOutput);
}

export async function handleErrors(err, req, res, _next) {
    if (err instanceof Error) {
        console.error(err);
        logError(err, req);
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    } else {
        res.status(err.status).json({
            message: err.message
        });
    }
}