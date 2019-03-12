# x-core client application boilerplate

### Install:

  - `npm install`
  
### What is used:

  - Custom CLI
  - React (MaterialUI, dreamstate as contextStore)
  - Typescript (decorators, OOP style, newest features, awt loader with babel)
  - Webpack, lazy loading, tree shaking, chunks + modular architecture, aliases
  - Jest
  - SCSS (globals), JSS (components), customized theme

  
### Commands:

  - `npm run start` - start in prod mode with minifications (localhost:3000)
  - `npm run start:dev` - start in dev mode with hot reload (localhost:3000)
   
  - `npm run build` - build in prod mode with minifications (target/dist/production)
  - `npm run build:dev` - build in dev mode with source maps (target/dist/development)

  - `npm run test` - test project, lint ts files

  - `npm run cli ${SCRIPT_NAME_THERE}` - run cli script, use cli.json for scripts adding

