/*
 * Debugging purposes.
 * Restricted in non DEV mode.
 *
 * @DebugMeasure() => @Bind() for bound methods.
 *
 */

import { Logger } from "@Lib/utils";

const dmLogger = new Logger("DM");

export const DebugMeasure = (): MethodDecorator => <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): any => {

  if (process.env.NODE_ENV !== "development") {
    throw new Error("Debugging utils are only available for DEV environment.");
  }

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

    dmLogger.info(`${target.constructor.name}[${propertyKey.toString()}]: ${duration ? duration : "±0"}ms.`);

    return returnValue;
  };

  if (descriptor.value) {
    // @ts-ignore
    descriptor.value = measureFunction;
  } else {
    descriptor.get = measureFunction;
  }

  return descriptor;
};
