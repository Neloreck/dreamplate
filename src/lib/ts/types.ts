/**
 * Callable method with generic params and return.
 */
export type TCallable<A = any, R = any> = (...args: Array<A>) => R;

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

/**
 * String indexed generic.
 */
export interface IStringIndexed<T> {
  [index: string]: T;
}
