import fs from 'fs'
import path from 'path'
import https from 'https'

import helmet from 'helmet'
import passport from "passport"
import cookieSession from "cookie-session"
import { Profile, Strategy } from 'passport-google-oauth20'
import express, { NextFunction, Request, Response } from 'express'

require('dotenv').config()

const PORT = 3000;

/* Chrome credentials*/
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

/* Passport Strategy Configuration*/
function verifyCallback(_accessToken: unknown, _refreshToken: unknown, profile: unknown, done: Function) {
    done(null, profile)
}

passport.use(new Strategy({
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID as string,
    clientSecret: config.CLIENT_SECRET as string,
}, verifyCallback))

/* Save the session to the cookie */
passport.serializeUser((user: Express.User, done) => {
    // Taking only the id to use less cookie memory.
    done(null, (user as Profile).id)
})

/* Read the session from the cookie */
passport.deserializeUser((id: Express.User, done) => {
    /* Database example */
    // User.findById(id).then(user =>{
    //     done(null,user);
    // });

    done(null, id)
})

/* Init Express */
const app = express()

/*Securing HTTP through Headers*/
app.use(helmet())

app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    // two keys to change change the keys that are being used
    keys: [config.COOKIE_KEY_1 as string, config.COOKIE_KEY_2 as string]
}))

/*  Passport handles the Authorization code response,
    it sends the auth code with the credentials to the auth server,
    and returns the token with extra information.
    */
app.use(passport.initialize())
app.use(passport.session())

/* Middleware*/
// TODO: move them apart
function checkLoggedIn(req: Request, res: Response, next: NextFunction) {
    const isLoggedIn = req.isAuthenticated() && req.user;

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

app.get("/auth/logout", (req, res) => {
    req.logOut((err) => {
        console.error(err)
    });
    return res.redirect('/')
})

app.get("/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/failure',
        successRedirect: '/',
        session: true
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