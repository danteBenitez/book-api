// @ts-check
import { Router } from "express";
import {
    createGenre,
    getAllGenres,
    getGenre,
    updateGenre,
    deleteGenre,
    getBookCount,
    getBooksByGenre
} from "../controllers/genre.controllers.js";
import { validate } from "../middleware/validate.js";
import {
  createGenreSchema,
  updateGenreSchema,
} from "../schema/genre.schema.js";
import { param } from "../middleware/validators.js";

const router = Router();

const idParam = param("authorId").isValidObjectId();

router.get("/", getAllGenres);

router.get('/books/count', getBookCount);

router.get('/books', getBooksByGenre);

router.get("/:genreId", validate(idParam), getGenre);

router.post("/", validate(createGenreSchema), createGenre);

router.put("/:genreId", validate(idParam, updateGenreSchema), updateGenre);

router.delete("/:genreId", validate(idParam), deleteGenre);

export default router;
