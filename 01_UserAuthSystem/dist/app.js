"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
/*Securing HTTP through Headers*/
app.use((0, helmet_1.default)());
/* */
function checkLoggedIn(req, res, next) {
    const isLoggedIn = true; // TODO
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in'
        });
    }
    next();
}
app.get("/auth/google", (req, res) => { });
app.get("/auth/google/callback", (req, res) => { });
app.get("/auth/logout", (req, res) => { });
app.get("/", ((req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
}));
app.get("/secret", checkLoggedIn, ((req, res) => {
    res.json({ message: "Secret" });
}));
// key and certificate files are generated using OpenSSL
https_1.default.createServer({
    key: fs_1.default.readFileSync("key.pem"),
    cert: fs_1.default.readFileSync("cert.pem")
}, app).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
