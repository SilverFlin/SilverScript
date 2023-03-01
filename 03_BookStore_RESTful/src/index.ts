// TODO basic express setup

import express from "express"


const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
    return res.json({ message: "test" })
})

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})