import fs from 'fs'
import path from 'path'
import https from 'https'

import helmet from 'helmet'
import passport from "passport"
import { Strategy } from 'passport-google-oauth20'
import express, { NextFunction, Request, Response } from 'express'

require('dotenv').config()

const PORT = 3000;

/* Chrome credentials*/
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

/* Passport Strategy Configuration*/
function verifyCallback(accessToken: unknown, refreshToken: unknown, profile: unknown, done: Function) {
    console.log('Google Profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    done(null, profile)
}

passport.use(new Strategy({
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID as string,
    clientSecret: config.CLIENT_SECRET as string
}, verifyCallback))

/* Init Express */
const app = express()

/*Securing HTTP through Headers*/
app.use(helmet())
/*  Passport handles the Authorization code response,
    it sends the auth code with the credentials to the auth server,
    and returns the token with extra information.
    */
app.use(passport.initialize())

/* Middleware*/
// TODO: move them apart
function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
    const isLoggedIn = true; // TODO

    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in'
        })
    }

    next();
}

// TODO create subrouting

/* End Points */

/* Root Page */
app.get("/", ((req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"))
}))

/* Auth */
app.get("/auth/google", passport.authenticate('google', {
    /* Things to get from the user */
    scope: ['email']
}))

app.get("/auth/logout", (req, res) => { })

app.get("/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: false
    }), (req, res) => {
        console.log('Google called us back')
    })

app.get("/failure", checkLoggedIn, ((req, res) => {
    res.json({ message: "Failed to log in" })
}))

/* More Endpoints */
app.get("/secret", checkLoggedIn, ((req, res) => {
    res.json({ message: "Secret" })
}))


/*  the https module from node is required to 
    set up the key and certificate credentials. */
https.createServer({
    /* Key and certificate files are generated using OpenSSL */
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})