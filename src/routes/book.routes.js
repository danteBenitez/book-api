// @ts-check
import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/book.controllers.js";
import { validate } from "../middleware/validate.js";
import { createBookSchema, updateBookSchema } from "../schema/book.schema.js";
import {param} from '../middleware/validators.js';
import { checkForFilenames } from "../middleware/validate-files.js";
import { isImage } from "../utils/isImage.js";

const router = Router();

const idParam = param('bookId').isValidObjectId();
const hasCover = checkForFilenames(['cover'], 'Debe enviar una imagen como portada del libro', isImage);

router.get("/", getAllBooks);

router.get("/:bookId", 
    validate(idParam), 
    getBook
);

router.post("/", 
    validate(createBookSchema), 
    hasCover,
    createBook
);

router.put("/:bookId", 
    validate(idParam, updateBookSchema), 
    hasCover,
    updateBook
);

router.delete("/:bookId", 
    validate(idParam), 
    deleteBook
);

export default router;
