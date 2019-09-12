/**
 * @module lib/ts
 */

/**
 * Callable method with generic params and retutn.
 */
export type Callable<A = any, R = any> = (...args: Array<A>) => R;

/**
 * Optional generic.
 */
export type Optional<T> = T | null;

/**
 * String indexed generic.
 */
export interface IStringIndexed<T> {
  [index: string]: T;
}

/**
 * Initial null declared as any value.
 */
export const InitialNull: any = null as any;
