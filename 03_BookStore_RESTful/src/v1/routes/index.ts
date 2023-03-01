import express from "express"
import booksRouter from "./bookRoutes"

const router = express.Router()

router.use("/books", booksRouter)

router.use(('/'), (req, res) => {
    res.json({ message: "Inside v1" })
})

export default router;