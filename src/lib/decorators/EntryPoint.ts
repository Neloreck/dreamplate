let called: boolean = false;

// tslint:disable typedef
export function EntryPoint(shouldCall?: boolean) {

  return (targetClass: { main: (argv: Array<string>) => void } ): void  => {

    if (shouldCall === false) {
      return;
    }

    if (targetClass.main) {
      targetClass.main(process.argv);
      called = true;
    } else if (!targetClass.main) {
      throw new Error("Entrypoint: not found entry - 'public static main(): void'.");
    }
  };
}
