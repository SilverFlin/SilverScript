// /books/1
import express from "express"
import { deleteBook, getAllBooks, getBookById, patchBook, postBook } from "../../controllers/bookController"

const router = express()

router.get("/", getAllBooks)

router.get("/:id", getBookById)

router.post("/", postBook)

router.patch("/:id", patchBook)

router.delete("/:id", deleteBook)


export default router