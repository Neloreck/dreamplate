import * as path from "path";

import * as React from "react";

import { RUNTIME_CONSTANTS } from "#/build/config/webpack.constants";

const ROOT_PATH: string = path.resolve(__dirname, "../../../");
const BABEL_TRANSFORMER_PATH: string = path.resolve(__dirname, "./babel_transformer.ts");

export const JEST_CONFIG = {
  cacheDirectory: "<rootDir>/target/test/cache",
  clearMocks: true,
  coverageDirectory: "<rootDir>/target/test/coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  globals: {
    ...RUNTIME_CONSTANTS,
    IS_TEST: true,
    IS_DEV: false,
    React,
  },
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "#/(.*)$": "<rootDir>/cli/$1",
    "@/(.*)$": "<rootDir>/src/application/$1",
    "\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/mocks/nonJSModule.js",
  },
  rootDir: ROOT_PATH,
  roots: ["<rootDir>"],
  // runner: "jest-runner",
  setupFiles: ["<rootDir>/cli/test/config/setup_tests.ts"],
  setupFilesAfterEnv: [],
  testEnvironment: "jsdom",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(j|t)sx?$": BABEL_TRANSFORMER_PATH,
  },
  transformIgnorePatterns: ["/node_modules/.+\\.js$"],
  verbose: true,
};
