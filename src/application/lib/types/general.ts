/**
 * Callable method with generic params and return.
 */
export type TCallable = (...args: Array<unknown>) => void;

/**
 * Optional generic.
 */
export type TOptional<T> = T | null;

/**
 * Any generic object.
 */
export type TAnyObject<T = any> = Record<string, T>;

/**
 * Any empty object.
 */
export type TEmptyObject = Record<string, never>;
