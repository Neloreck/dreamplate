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
