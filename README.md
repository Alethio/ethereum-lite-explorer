# block-explorer

Front-end application for Block Explorer

## Installation

1. `cp config.default.json config.dev.json`
2. `npm install`
3. `npm run build` (or `npm run build-dev` for development).
4. `npm start`

## Running the tests

`npm test` (or `npm run test-coverage` to generate code coverage as well).

Test coverage is written to `./coverage` in HTML and LCOV formats.

Configuration for the VSCode LCOV extension is already included in the project.

## Project structure
```
📁block-explorer
├─📁dev             - dev server for serving the app and mocking block-explorer-api responses
├─📁dist            - target folder for application that contains deployables
└─📁src             - source files
  ├─📁app (*1)      - application source code
  ├─📁assets        - static assets (e.g. images) that will be bundled together with the application
  └─📁public        - contains static assets that are copied to the dist folder as they are

(*1)
📁app
├─📁components      - application-level components to be reused across all pages (render layer)
├─📁data            - data layer (data structures, parsing server responses, caching, transformations, state mgmt)
├─📁helpers         - application-specific helpers/utils that couldn't be categorized differently 😄
├─📁page            - components for each page/view of the application
│ └─📁<pageName>
├─📁translation     - localized strings
├─📁util            - application-agnostic utilities. Ideally these would be in a separate repo/package.
└─📄index.ts         - entry point
```

## Managing SVG icons

Original SVG sources should be kept in the `src/assets/original-svg` folder. To create SVG icon components from them, the following steps should be taken:

1. Copy the SVG markup in the render method of a new React component
2. Replace all dash (-) attributes with camelCase
3. Remove any unneeded attributes or run the SVG through an optimizer tool
4. The viewBox of the icon should be a square. If needed use `<g transform="translate(x,y)">` to center the icon in the new viewBox. This allows proper sizing via `size` prop
5. Replace the main fill/stroke color with `currentColor`, to ensure proper cascading, or parametrize if more than one color
6. The resulting component should be configured with a size prop that applies to both width and height
