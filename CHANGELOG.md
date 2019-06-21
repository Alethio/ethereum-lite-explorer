# Changelog
All notable changes to this project will be documented in this file.

## [1.0.0-beta.5] - 2019-06-21
- Add support for plugins through the [Alethio CMS](https://github.com/Alethio/cms)
- Support Basic Auth when connecting to the Ethereum node
- Fixed various bugs and issues
- Breaking changes
    - Remove all previous env vars except `APP_NODE_URL` and `APP_BASE_URL`
    - Remove network selector (better solution on the way)
    - Remove file scheme support (requires HTTP server)
    - Remove # routing
