export const applicationConfig = {
  env: (process.env.NODE_ENV as string),
  initialLoad: Date.now(),
  isDev: (process.env.NODE_ENV === "development")
};
