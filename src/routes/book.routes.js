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
import { hasValidObjectId } from "../schema/objectId.schema.js";

const router = Router();

const idParam = hasValidObjectId('bookId');

router.get("/", getAllBooks);

router.get("/:bookId", 
    validate(idParam), 
    getBook
);

router.post("/", 
    validate(createBookSchema), 
    createBook
);

router.put("/:bookId", 
    validate(idParam, updateBookSchema), 
    updateBook
);

router.delete("/:bookdId", 
    validate(idParam), 
    deleteBook
);

export default router;
