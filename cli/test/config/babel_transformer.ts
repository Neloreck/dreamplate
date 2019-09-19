import { createTransformer } from "babel-jest";

/**
 * Custom transformer for jest tests with provided config.
 */

/**
 * todo: Remove babel config from tsconfig and reuse it?
 */

const transformerConfig = {
  babelrc: false,
  plugins: [
    "@babel/plugin-transform-runtime"
  ],
  presets: [
    "@babel/env",
    "@babel/react"
  ]
};

const transformer = createTransformer(transformerConfig);

module.exports = transformer;
