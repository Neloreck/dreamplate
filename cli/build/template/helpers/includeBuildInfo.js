// const packageInfo = require("../../../../package.json");
const process = require("process");

export default () => {

  return (
    `  ENVIRONMENT: ${process.env.NODE_ENV};
    DATE: ${new Date()};
    ARCH: ${process.arch};
    PLATFORM: ${process.platform};`
  );

};
