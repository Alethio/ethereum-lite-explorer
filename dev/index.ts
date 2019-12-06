import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as morgan from "morgan";
import open = require("open");
import { AddressInfo } from "net";

const basePath = process.env.APP_BASE_PATH ?
    "/" + process.env.APP_BASE_PATH.replace(/^\//, "").replace(/\/$/, "") + "/" :
    "/";

let app = express();

app.use(morgan("dev"));

app.get(`${basePath}config.json`, (req, res) => {
    let configJson = fs.readFileSync("../config.dev.json", "utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(configJson);
});

app.use(basePath, express.static(path.resolve("../dist")));

app.use(`${basePath}plugins`, express.static(path.resolve("../dist/plugins"), { fallthrough: false }));

// Fallback for HTML 5 routing
app.use(`${basePath}*`, (req, res) => res.sendFile(path.resolve("../dist/index.html")));

let server = app.listen(Number(process.env.PORT) || 3000, process.env.HOST || "127.0.0.1", async () => {
    let address = server.address() as AddressInfo;
    process.stdout.write(`Listening on ${address.address + ":" + address.port}\n`);

    try {
        await open(`http://localhost:${address.port}${basePath}`);
    } catch (e) {
        process.stderr.write(`\nFailed to open web browser. You can open it yourself and ignore this error. ${e}`);
    }
});
