/**
 * @module @lib
 */

import { Callable } from "@Lib/ts";

/**
 * Resolve promise after seconds provided.
 * Used like 'await forSeconds(5)'.
 */
export const forSeconds = (time: number) => new Promise((resolve: Callable) => setTimeout(resolve, time * 1000));
