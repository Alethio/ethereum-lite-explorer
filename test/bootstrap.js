const path = require("path");

require("tsconfig-paths").register();

require("ts-node").register({
    project: path.resolve("./tsconfig.test.json"),
    typeCheck: true,
    cache: false
});
