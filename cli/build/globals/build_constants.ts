export const IS_PRODUCTION: boolean = (process.env.NODE_ENV === "production");

export const APPLICATION_ROOT: string = IS_PRODUCTION ? "c" : "application-root";
export const PORTAL_ROOT: string = IS_PRODUCTION ? "m" : "modal-root";
