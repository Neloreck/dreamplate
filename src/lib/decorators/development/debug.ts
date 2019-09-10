/*
 * Debugging purposes.
 * Restricted in non DEV mode.
 *
 * @DebugMeasure() => @Bind() for bound methods.
 *
 */

/* <dev> */

import { Logger } from "@Lib/utils";

const dmLogger: Logger = new Logger("DM");

/* </dev> */

export const DebugMeasure = (): MethodDecorator => <T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): any => {

  /* <production> */
  throw new Error("Debugging utils are only available for DEV environment.");
  /* </production> */

  /* <dev> */

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

  /* </dev> */
};

/*
 * Debugging purposes.
 * Restricted in non DEV mode.
 */

export const DebugExpose = (name: string = "default"): ClassDecorator => (target: any): any => {

  /* <production> */
  throw new Error("Debugging utils are only available for DEV environment.");
  /* </production> */

  /* <dev> */

  // @ts-ignore
  if (!window.exposed) {
    // @ts-ignore
    window.exposed = {};
  }

  return class extends target {

    constructor(...params: Array<any>) {
      super(params);

      // @ts-ignore
      window.exposed[name] = this;
    }
  };

  /* </dev> */

};