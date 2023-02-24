import fs from 'fs'
import path from 'path'
import https from 'https'
import express from 'express'

const app = express()
const PORT = 3000;

app.get("/", ((req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
}))

app.get("/secret", ((req, res) => {
    res.json({ message: "Secret" })
}))

// key and certificate files are generated using OpenSSL
https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})