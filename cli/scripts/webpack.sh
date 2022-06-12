#!/bin/bash

COMMAND=$1
COMMAND_ARGS=${@:2}

start_server() {
  pnpm ts-node --project ./cli/tsconfig.json ./cli/build/DevRunner.ts "${COMMAND_ARGS}"
}

build_bundle() {
  pnpm rimraf ./target || exit 1
  pnpm ts-node --project ./cli/tsconfig.json ./cli/build/BuildRunner.ts "${COMMAND_ARGS}"
}

start_dev_server() {
  export NODE_ENV=development
  export REFRESH=true

  start_server
}

start_prod_server() {
  export NODE_ENV=production

  start_server
}

build_dev_bundle() {
  export NODE_ENV=development
  export ANALYZE=true

  build_bundle
}

build_prod_bundle() {
  export NODE_ENV=production
  export ANALYZE=true

  build_bundle
}

execute() {
  case "${COMMAND}" in
    "start-dev-server") start_dev_server ;;
    "start-prod-server") start_prod_server ;;
    "build-dev-bundle") build_dev_bundle ;;
    "build-prod-bundle") build_prod_bundle ;;
    *)
      echo 'Command argument is required.'
      exit 1
    ;;
  esac
}

execute
