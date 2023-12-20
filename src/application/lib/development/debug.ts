/**
 * Debugging purposes.
 * Restricted in non DEV mode.
 */

import { log } from "#/build/macroses/log.macro";
import { TAnyObject } from "@/lib/types";

interface IAugmentedWindow extends Window {
  exposed?: Record<string, unknown>;
}

/**
 * Measure method execution time and log execution info.
 */
export function DebugMeasure(): MethodDecorator {
  return <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): any => {
    // todo: Update.

    /* <production> */
    throw new Error("Debugging utils are only available for DEV environment.");
    /* </production> */

    let originalFunction: any;

    if (descriptor.value) {
      originalFunction = target[propertyKey];
    } else {
      originalFunction = descriptor.get;
    }

    const measureFunction = (...params: Array<any>): any => {
      const start: number = Date.now();
      const returnValue = originalFunction(...params);
      const duration: number = Date.now() - start;

      log.info(`${target.constructor.name}[${propertyKey.toString()}]: ${duration ? duration : "±0"}ms.`);

      return returnValue;
    };

    if (descriptor.value) {
      (descriptor.value as any) = measureFunction;
    } else {
      descriptor.get = measureFunction;
    }

    return descriptor;
  };
}

/**
 * Expose class to a window for temporary debugging.
 */
export function DebugExpose(name?: string): ClassDecorator {
  return (descriptor: TAnyObject): any => {
    /* <production> */
    throw new Error("Debugging utils are only available for DEV environment.");
    /* </production> */

    const exposingTarget: IAugmentedWindow = window as IAugmentedWindow;

    if (!exposingTarget.exposed) {
      exposingTarget.exposed = {};
    }

    return {
      ...descriptor,
      finisher: (target: any) =>
        class extends target {
          public constructor(...params: Array<any>) {
            super(...params);

            exposingTarget.exposed![name || target.name] = this;
          }
        },
    };
  };
}
