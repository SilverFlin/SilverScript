import fs from 'fs'
import path from 'path'
import https from 'https'

import helmet from 'helmet'
import express, { NextFunction, Request, Response } from 'express'

const app = express()
const PORT = 3000;

/*Securing HTTP through Headers*/
app.use(helmet())

/* */

function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
    const isLoggedIn = true; // TODO

    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in'
        })
    }

    next();
}

app.get("/auth/google", (req, res) => { })

app.get("/auth/google/callback", (req, res) => { })

app.get("/auth/logout", (req, res) => { })

app.get("/", ((req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
}))

app.get("/secret", checkLoggedIn, ((req, res) => {
    res.json({ message: "Secret" })
}))

// key and certificate files are generated using OpenSSL
https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})