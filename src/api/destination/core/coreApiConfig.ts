/**
 * Core api config.
 * Should be scoped to separate api modules there.
 */
export const coreApiConfig = {

  DEFAULT_HEADERS: new Headers({
    Accept: "application/json",
    "Content-Type": "application/json"
  }),

  // Some kind of remote server.
  SERVER_URL: process.env.SERVER_URL as string,

};
