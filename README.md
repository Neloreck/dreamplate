# x-core client application boilerplate

### Install:

  - `npm install` [fist time only]

  - `npm run setup`

### Size and general performance:

  - MIN + GZIP - (< 80KB) in total
  - load time: 70-100 ms for iMac 2017, 250-300 ms for Acer Nitro 5
  - 5-6.5MB memory heap
  - Optimized react VDOM tree (except react-router and react-jss)

### What is used:

  - Custom CLI
  - Webpack, lazy loading, tree shaking, chunks + modular architecture, aliases
  - React, dreamstate(1.5KB) as contextStore
  - JSS, roject theming with own context management
  - Typescript (decorators, OOP style, newest features, awt loader with babel)
  - Jest
  - TSLint
  - HMR with live editing
  - HBS (template, global styles)

### Commands:

  - `npm run setup` - install all project dependencies (each package.json) via lerna

  - `npm run start` - start in prod mode with minifications (https://localhost:3000)

  - `npm run start:dev` - start in dev mode with hot reload (https://localhost:3000)
   
  - `npm run build` - build in prod mode with minifications (target/dist/production)

  - `npm run build:dev` - build in dev mode with source maps (target/dist/development)

  - `npm run test` - test project, lint ts files

  - `npm run cli ${SCRIPT_NAME_THERE}` - run cli script, use cli.json for scripts adding

  - `npm run cli docs:generate` - generate project docs

### General project structure tree

  - **cli** [project commands and everything runnable]

    - __cli_ [internal implementation]

    - _build_ [webpack build configuration and scripts]
       - config [configuration]
       - loaders [webpack loaders for files processing]
       - public [public files that will be copied to target dist]
       - template [project template specific scripts and configs]

    - _test_ [jest testing configuration and runner]
       - config [configuration]

  - **src** [project source code]
  
    - _api_ [project client api mule, everything related to data exchange]
      - GENERIC_DESTINATION (*)

    - _application_[application specific code]
      - initialization [inlide pre-executed code with first priority]
      - main [application specific code shared between all modules]
      - modules [folder with application modules]
        - GENERIC MODULE (*)

    - _lib_ - [shared utils and code samples that can be reused later]
      - GENERIC_LIB (*)

  ---

  + **GENERIC_DESTINATION** [specific api destination or route that includes api exchange and models declaration]
  + **GENERIC_MODULE** [specific application module that implements application route -> feature]
  + **GENERIC_LIB** [specific library module that includes sharable code between applications]

  --- 
  
  Typically module is separated as VIEW and DATA sub-modules. Each one includes only view or data logic and tries to keep this pattern.

## Imports declaration priority

 - node_modules
 - @Lib
 - @Api
 - @Data
 - @View
 - 'styles'
 - 'props/types'

## Futures

  - Eslint
  - Better docs / typedoc
  - LitElements as UI components lib experiment..? (web-components based)
  - SSR investigations
  - JSS and react-router update with pure VDOM tree (!)
  - Meta tags and general PWA improvements
  - Experiment and comparison with Preact
  - Benchmark for testing?
  - Tests examples with react rendering
  - Build something from wasm as experiment and use wasm-loader

## Side packages (waiting for)

  - Hooks implementation for react-router
  - Hooks implementation for react-jss
  - Modules issue for typedoc package resolve
