#!/bin/bash

COMMAND=$1
COMMAND_ARGS=${@:2}

RED="\033[2;31m"
GREEN="\033[2;32m"
NC="\033[0m"

echo_green() {
  echo -e "${GREEN}$1${NC}"
}

echo_red() {
  echo -e "${RED}$1${NC}"
}

jest() {
  echo_green "Performing jest tests: '${COMMAND_ARGS:-*}'."
  npx cross-env NODE_ENV=test ts-node --project ./cli/test/config/tsconfig.json ./cli/test/TestRunner.ts "$COMMAND_ARGS"
}

type_check() {
  echo_green "Performing type check."
  npx tsc -p src --noEmit
}

format() {
  echo_green "Performing codebase formatting."
  npx prettier --write "**/*.(js|ts|tsx)" && npx eslint . --ext .ts,.tsx --fix
}

lint() {
  LINT_ARGS=${COMMAND_ARGS:-src/**/*.ts src/**/*.tsx cli/**/*.ts}

  echo_green "Performing lint check: '$LINT_ARGS'."
  npx eslint -c ./.eslintrc.json $LINT_ARGS
}

verify() {
  COMMAND_ARGS=()
  type_check && jest && lint
}

execute() {
  case "${COMMAND}" in
    "typecheck") type_check ;;
    "format") format ;;
    "jest") jest ;;
    "lint") lint ;;
    *) verify ;;
  esac
}

execute
