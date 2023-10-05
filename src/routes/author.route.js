// @ts-check
import { Router } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from "../controllers/author.controllers.js";
import { validate } from "../middleware/validate.js";
import {
  createAuthorSchema,
  updateAuthorSchema,
} from "../schema/author.schema.js";
import { hasValidObjectId } from "../schema/objectId.schema.js";

const router = Router();

const idParam = hasValidObjectId("authorId");

router.get("/", getAllAuthors);

router.get("/:authorId", validate(idParam), getAuthor);

router.post("/", validate(createAuthorSchema), createAuthor);

router.put("/:authorId", validate(idParam, updateAuthorSchema), updateAuthor);

router.delete("/:authorId", validate(idParam), deleteAuthor);

export default router;
