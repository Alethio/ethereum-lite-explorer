import * as express from "express";
import * as path from "path";
import * as fs from "fs";
import * as morgan from "morgan";
import opn = require("opn");
import { AddressInfo } from "net";

let app = express();

app.use(morgan("dev"));

app.get("/config.json", (req, res) => {
    let configJson = fs.readFileSync("../config.dev.json", "utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(configJson);
});

app.use("/", express.static(path.resolve("../dist")));

// Fallback for HTML 5 routing
app.use("/*", (req, res) => res.sendFile(path.resolve("../dist/index.html")));

let server = app.listen(Number(process.env.PORT) || 3000, process.env.HOST || "127.0.0.1", () => {
    let address = server.address() as AddressInfo;
    process.stdout.write(`Listening on ${address.address + ":" + address.port}\n`);

    opn(`http://localhost:${address.port}`);
});
