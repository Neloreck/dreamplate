/* tslint:disable: no-console */

export class Logger {

  private static readonly IS_DEV: boolean = process.env.NODE_ENV === "development";

  private readonly prefix: string;
  private readonly enabled: boolean = true;

  public constructor(prefix: string, enabled?: boolean) {

    this.prefix = prefix;

    if (enabled !== undefined) {
      this.enabled = enabled;
    }
  }

  // Functional methods.

  public getPrefixed(prefix: string, enabled?: boolean): Logger {
    return new Logger(this.prefix + " " + prefix, enabled);
  }

  public debug(...args: Array<any>): void {

    if (Logger.IS_DEV && this.enabled) {
      console.debug(`%c${this.prefix}`, "color: #bada53", "[D]", ...args);
    }
  }

  public warn(...args: Array<any>): void {

    if (Logger.IS_DEV && this.enabled) {
      console.warn(`%c${this.prefix}`, "color: #bada53", ...args);
    }
  }

  public error(...args: Array<any>): void {
    console.error(`%c${this.prefix}`, "color: #bada53", ...args);
  }

  public info(...args: Array<any>): void {

    if (Logger.IS_DEV && this.enabled) {
      console.info(`%c${this.prefix}`, "color: #bada53", ...args);
    }
  }

  public pushSeparator(): void {

    if (Logger.IS_DEV && this.enabled) {
      console.info("=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=");
    }
  }

}
