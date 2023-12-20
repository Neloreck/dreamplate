# Dreamplate client application starter

### Install:
- `npm install`
- `./run setup` <br/>
    or
- `npm install -g pnpm`
- `./run setup`

### Start working:
- `./run start:dev`
- `Open browser and go to 'https://localhost:3000`

### Build app:
- `./run build`
- `Open target/dist folder and check output`

### CLI Scripts
- `./run help` [print avaliable commands with description]
- `./run build` [build project in production mode]
- `./run build:dev` [build project in development mode]
- `./run start` [start project in production mode]
- `./run start:dev` [build project in production mode]
- `./run verify` [run unit tests, linter and type checker]
- `./run COMMAND_NAME` [run specific cli script]

### What is used:
- Custom CLI
- Webpack (babel loader)
- React 
- dreamstate (store manager)
- JSS, theming with basoc functionality
- Typescript
- Jest for unit testing
- React fast refresh for HMR
- HBS (template, global styles)
