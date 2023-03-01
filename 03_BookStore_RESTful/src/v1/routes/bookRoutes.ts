// /books/1
import express from "express"

const router = express()

router.get("/", (req, res) => {
    return res.json({ message: `All books` })
})

router.get("/:id", (req, res) => {
    return res.json({ message: `Book #${req.params.id} Info.` })
})

router.post("/", (req, res) => {
    return res.json({ message: `Post Book` })
})

router.patch("/:id", (req, res) => {
    return res.json({ message: `Patch Book #${req.params.id}.` })
})

router.delete("/:id", (req, res) => {
    return res.json({ message: `Delete Book #${req.params.id}.` })
})


export default router