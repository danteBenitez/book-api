import { resolve } from 'path';
import 'dotenv/config'

export const envConfig = {
    PORT: process.env.PORT || 8080,
    SECRET: process.env.SECRET || 'clave_secreta',
    DB: {
        URI: process.env.DB_URI || 'booksdb'
    },
    IS_PROD: process.env.NODE_ENV === 'production',
    LOGGING_DIR: resolve(process.cwd(), process.env.LOG_DIR || "./logs")
}