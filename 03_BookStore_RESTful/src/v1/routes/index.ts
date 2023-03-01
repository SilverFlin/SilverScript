import express from "express"


const router = express.Router()


router.use(('/'), (req, res) => {
    res.json({ message: "Inside v1" })
})

export default router;