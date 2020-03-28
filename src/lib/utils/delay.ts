/**
 * @packageDocumentation
 * @module @lib/utils
 */

import { TCallable } from "@Lib/ts";

/**
 * Resolve promise after millis provided.
 * Used like 'await forMillis(200)'.
 */
export const forMillis = (time: number) => new Promise((resolve: TCallable) => setTimeout(resolve, time));

/**
 * Resolve promise after seconds provided.
 * Used like 'await forSeconds(5)'.
 */
export const forSeconds = (time: number) => forMillis(time * 1000);
