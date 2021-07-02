import { TCallable } from "@Lib/types";

/**
 * Resolve promise after millis provided.
 * Used like 'await forMillis(200)'.
 */
export function forMillis(time: number): Promise<void> {
  return new Promise((resolve: TCallable) => setTimeout(resolve, time));
}

/**
 * Resolve promise after seconds provided.
 * Used like 'await forSeconds(5)'.
 */
export function forSeconds(time: number): Promise<void> {
  return forMillis(time * 1000);
}
