import * as path from "path";

const ROOT_PATH: string = path.resolve(__dirname, "../../../");
const TS_CONFIG_PATH: string = path.resolve(ROOT_PATH, "./src/tsconfig.json");

export const JEST_CONFIG = {

  // automock: false,

  // bail: false,

  // browser: false,

  cacheDirectory: "<rootDir>/target/test/cache",

  clearMocks: true,

  collectCoverage: true,

  // collectCoverageFrom: null,

  coverageDirectory: "<rootDir>/target/test/coverage:report",

  coveragePathIgnorePatterns: [
    "/node_modules/"
   ],

  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // coverageThreshold: null,

  // errorOnDeprecated: false,

  // forceCoverageMatch: [],

  // globalSetup: null,

  // globalTeardown: null,

  moduleDirectories: [
     "node_modules"
  ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  moduleNameMapper: {
    "@App/(.*)$": "<rootDir>/src/main/$1",
    "@Lib/(.*)$": "<rootDir>/src/lib/$1",
    "@Test/(.*)$": "<rootDir>/src/__test__/$1",
    "\\.(css|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__test__/mocks/nonJSModule.js",
  },

  // notify: false,

  // notifyMode: "always",

  // preset: null,

  // projects: null,

  // reporters: undefined,

  // resetMocks: false,

  // resetModules: false,

  // resolver: null,

  // restoreMocks: false,

  rootDir: ROOT_PATH,

  roots: [
    "<rootDir>"
  ],

  // runner: "jest-runner",

  // setupFiles: [],

  // setupTestFrameworkScriptFile: null,

  // snapshotSerializers: [],

  // testEnvironment: "jest-environment-jsdom",

  // testEnvironmentOptions: {},

  // testLocationInResults: false,

  testMatch: [
     "**/__tests__/**/*.ts?(x)",
     "**/?(*.)+(Spec|__test__).ts?(x)"
   ],

  testPathIgnorePatterns: [
    "/node_modules/"
  ],

  // testResultsProcessor: null,

  // testRunner: "jasmine2",

  // testURL: "about:blank",

  // timers: "real",

  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },

  transformIgnorePatterns: [
    "/node_modules/"
  ],

  // unmockedModulePathPatterns: undefined,

  verbose: true,

  // watchPathIgnorePatterns: [],

  // watchman: true,

  globals: {
    "ts-jest": {
      tsConfig: TS_CONFIG_PATH,
    }
  }

};
