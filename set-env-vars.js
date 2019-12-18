#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

if (process.argv.length < 4) {
    process.stdout.write(`Usage: set-env-vars.js <config_in_json_path> <config_out_json_path>`);
    process.exit(1);
}
const [,, inFile, outFile] = process.argv;

let defaultConfig = JSON.parse(fs.readFileSync(path.resolve(inFile), "utf-8"));

if (process.env.APP_NODE_URL) {
    let pluginConfigs = defaultConfig["plugins"];
    if (Array.isArray(pluginConfigs)) {
        let litePluginConfig = pluginConfigs.find(plugin => plugin.uri.match(/^plugin:\/\/aleth.io\/eth-lite/)).config;
        litePluginConfig["nodeUrl"] = process.env.APP_NODE_URL;
    } else {
        // Legacy format: removing this will be a breaking change for Docker setups with custom config mounted.
        let litePluginKey = Object.keys(pluginConfigs).find(k => k.match(/^plugin:\/\/aleth.io\/eth-lite/));
        pluginConfigs[litePluginKey]["nodeUrl"] = process.env.APP_NODE_URL;
    }
}

fs.writeFileSync(path.resolve(outFile), JSON.stringify(defaultConfig, undefined, "\t"));
