import express from "express"
import morgan from "morgan"
import { createProxyMiddleware } from "http-proxy-middleware"

/* Create Express Server */
const app = express();

/* Configuration */
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://catfact.ninja";

/* Logs */
app.use(morgan('dev'))

/* Endpoints */
app.get("/info", (req, res) => {
    return res.send('This is a proxy service which adds auth to the use of an API.')
})

/* Auth */
app.use("", (req, res, next) => {
    // Any header under the name of authorization would work
    if (req.headers.authorization) {
        next()
    } else return res.sendStatus(403)
})



/* Proxy */
app.use('/SilverProxy', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { [`^/SilverProxy`]: '' } // removes the SilverProxy from the request
}))


/* Start server */
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`)
})