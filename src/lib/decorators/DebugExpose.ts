/*
 * Debugging purposes.
 * Restricted in non DEV mode.
 */

export const DebugExpose = (name: string): ClassDecorator => (target: any): any => {

  if (process.env.NODE_ENV !== "development") {
    throw new Error("Debugging utils are only available for DEV environment.");
  }

  // @ts-ignore
  if (!window.debug) {
    // @ts-ignore
    window.debug = {};
  }

  return class extends target {

    constructor(...params: Array<any>) {
      super(params);

      // @ts-ignore
      window.debug[name] = this;
    }
  };

};
