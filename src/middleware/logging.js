import morgan from "morgan";
import { resolve } from "path";
import { getStreamForLogFile } from "../utils/getStreamForLogFile.js";
import { envConfig } from "../config/env.js";

export const LOGGING_FOLDER = envConfig.LOGGING_DIR;

export async function logRequests(req, res, next) {
  const stream = await getStreamForLogFile(LOGGING_FOLDER, "access");

  const logger = morgan("combined", {
    stream: stream,
    skip: (req) => req.statusCode <= 299 && req.statusCode >= 200,
  });

  logger(req, res, next);
}
