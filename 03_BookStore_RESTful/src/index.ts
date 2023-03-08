import https from "https"
import fs from "fs"

import express from "express"
import v1Router from "./v1/routes";
import v2Router from "./v2/routes";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())

/* Mount Routers */
app.use("/v1", v1Router)
app.use("/v2", v2Router)


const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app)

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})