let isCalled: boolean = false;

export function Run(shouldCall?: boolean) {
  return (targetClass: { main: (argv: Array<string>) => void }): void => {
    if (shouldCall === false) {
      return;
    }

    if (targetClass.main && !isCalled) {
      targetClass.main(process.argv);
      isCalled = true;
    } else if (isCalled) {
      throw new Error("Entrypoint: already called.");
    } else if (!targetClass.main) {
      throw new Error("Entrypoint: not found entry - 'public static main(): void'.");
    }
  };
}
