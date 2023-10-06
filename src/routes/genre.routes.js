// @ts-check
import { Router } from "express";
import {
    createGenre,
    getAllGenres,
    getGenre,
    updateGenre,
    deleteGenre,
    getBookCountByGenre
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

router.get("/:authorId", validate(idParam), getGenre);

router.post("/", validate(createGenreSchema), createGenre);

router.put("/:authorId", validate(idParam, updateGenreSchema), updateGenre);

router.delete("/:authorId", validate(idParam), deleteGenre);

router.get('/books/count', getBookCountByGenre);

export default router;
