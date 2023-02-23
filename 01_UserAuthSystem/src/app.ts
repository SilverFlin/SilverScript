import express from 'express'

const app = express()
const PORT = 3000;

app.get("/", ((req, res) => {
    res.send("test")
}))

app.get("/secret", ((req, res) => {
    res.send("secret")
}))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})