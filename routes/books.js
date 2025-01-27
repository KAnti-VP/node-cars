import express from "express";
import * as booksControls from "../controls/booksControls.js";

const router = express.Router();

router.get("/", booksControls.getAllBooks);

router.get("/:id", booksControls.getBookById);

router.post("/", booksControls.createBook);

router.put("/:id", booksControls.updateBook);

router.delete("/:id", booksControls.deleteBook);

export default router;
