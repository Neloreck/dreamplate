/**
 * @module lib/decorators
 */

let called: boolean = false;

// tslint:disable typedef
/**
 * Entry point decorator.
 * Takes process args and executes static main method of target.
 */
export function EntryPoint(shouldCall?: boolean) {

  return (targetClass: { main: (argv: Array<string>) => void } ): void  => {

    if (shouldCall === false) {
      return;
    }

    if (targetClass.main) {
      targetClass.main(process.argv);
      called = true;
    } else if (called && !IS_DEV) {
      throw new Error("Entrypoint: already called, seems like you are referring it from application.");
    } else if (!targetClass.main) {
      throw new Error("Entrypoint: not found entry - 'public static main(): void'.");
    }
  };
}
