#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

let defaultConfig = JSON.parse(fs.readFileSync(path.join(__dirname, "config.default.json"), "utf-8"));

let pluginConfigs = defaultConfig["plugins"];
let litePluginKey = Object.keys(pluginConfigs).find(k => k.match(/^plugin:\/\/aleth.io\/eth-lite/));
pluginConfigs[litePluginKey]["nodeUrl"] = process.env.APP_NODE_URL;

fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(defaultConfig, undefined, "\t"));
