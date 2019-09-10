export type Callable<A = any, R = any> = (...args: Array<A>) => R;

export type Optional<T> = T | null;

export interface IStringIndexed<T> {
  [index: string]: T;
}

export const InitialNull: any = null as any;
