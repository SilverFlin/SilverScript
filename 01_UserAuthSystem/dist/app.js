"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const https_1 = __importDefault(require("https"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get("/", ((req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public", "index.html"));
}));
app.get("/secret", ((req, res) => {
    res.json({ message: "Secret" });
}));
// key and certificate files are generated using OpenSSL
https_1.default.createServer({
    key: fs_1.default.readFileSync("key.pem"),
    cert: fs_1.default.readFileSync("cert.pem")
}).listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
