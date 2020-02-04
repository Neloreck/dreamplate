/**
 * @packageDocumentation
 * @module @lib/utils
 */

import { Callable } from "@Lib/ts";

/**
 * Resolve promise after seconds provided.
 * Used like 'await forSeconds(5)'.
 */
export const forSeconds = (time: number) => new Promise((resolve: Callable) => setTimeout(resolve, time * 1000));

/**
 * Resolve promise after millis provided.
 * Used like 'await forMillis(200)'.
 */
export const forMillis = (time: number) => new Promise((resolve: Callable) => setTimeout(resolve, time));
