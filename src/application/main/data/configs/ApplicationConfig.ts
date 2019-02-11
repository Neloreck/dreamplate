export const applicationConfig = {
  env: (process.env.NODE_ENV as string),
  isDev: (process.env.NODE_ENV === "development")
};
