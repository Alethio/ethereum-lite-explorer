# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased] - 2020-04-29

- Update `eth-ibft2` plugin to 2.0.1, fixing usage with `eth-memento`

## [1.0.0-beta.10] - 2020-04-29

- Update to @alethio/cms@1.0.0-beta.12 (which adds support for plugin data source dependencies)
- Update `eth-lite` plugin version to 4.2.0 (support for custom rpc node auth methods)

## [1.0.0-beta.9] - 2020-04-21

- Update to @alethio/cms@1.0.0-beta.11. Older plugins may need to be updated. See the @alethio/cms changelog for more info.
- Adds support for new plugin configuration structure, allowing translation strings overrides. See the @alethio/cms readme for more info.
- Fix error that occurred when starting the local development server on some Linux systems

## [1.0.0-beta.8] - 2019-11-12

- Update config.memento.json and Memento instructions
- Update `eth-memento` plugin version to 1.1.0 in Dockerfile

## [1.0.0-beta.7] - 2019-10-31

- Update to @alethio/cms@1.0.0-beta.7, which adds support for dependencies between plugin data adapters
- Update all plugins with support for new CMS version
- Update instruction for memento pipeline setup - How to show the transactions per account in account page

## [1.0.0-beta.6] - 2019-09-09

- Fix APP_BASE_URL slash (/) escaping
- Update plugins (eth-common@2.3.0, eth-lite@2.1.0)
- Allow custom ETH currency symbol
- Fix search results clicks not working on touchpads and with slower mouse clicks
- Support deployments on a domain sub-path (e.g. https://my.domain.tld/lite-explorer) via `APP_BASE_PATH` build-time env.
- Cosmetic updates to theme colors
- Fix Hotjar styling

## [1.0.0-beta.5] - 2019-06-21
- Add support for plugins through the [Alethio CMS](https://github.com/Alethio/cms)
- Support Basic Auth when connecting to the Ethereum node
- Fixed various bugs and issues
- Breaking changes
    - Remove all previous env vars except `APP_NODE_URL` and `APP_BASE_URL`
    - Remove network selector (better solution on the way)
    - Remove file scheme support (requires HTTP server)
    - Remove # routing
