import { ChildProcess, spawn } from "child_process";
import { green, red } from "colors";

export interface IExecutableScriptDescriptor {
  exec: string;
}

export type TExecutableScript = string | Array<string>;

export class CommandRunner {

  protected static readonly PARENT?: string = process.env.PARENT;

  private readonly cmd: string;
  private readonly cmdAdditionalArgs: Array<string> = [];
  private readonly script: TExecutableScript;
  private readonly config: any; // todo: Implement cli configuration if it will be needed.

  private finished: boolean = false;
  private startTime: number = NaN;

  private childProcess: ChildProcess | null = null;

  public constructor(cmd: string, cmdAdditionalArgs: Array<string>, script: TExecutableScript | IExecutableScriptDescriptor, config?: object) {
    this.cmd = cmd;
    this.cmdAdditionalArgs = cmdAdditionalArgs;
    this.script = typeof script === "object" ? (script as IExecutableScriptDescriptor).exec : script;
    this.config = config;

    [ "exit", "uncaughtException", "unhandledRejection", "SIGUSR1", "SIGUSR2", "SIGINT" ]
      .forEach((it: string) => process.on(<any>it, this.onProcessShutdown.bind(this)));
  }

  public async run(): Promise<void> {
    if (this.script) {
      const hasMultipleSubscripts: boolean = Array.isArray(this.script);

      this.onStart(!hasMultipleSubscripts);

      try {
        if (hasMultipleSubscripts) {
          await this.executeCommands(this.script as Array<string>);
        } else {
          await this.executeCommand(this.script as string);
        }

        this.onSuccess();
      } catch (error) {
        this.onError(error);
      } finally {
        this.finished = true;
      }
    } else {
      // Handle cases with wrong script arg and return non-zero code.
      process.stdout.write(`\nError running script. Command '${red(this.cmd)}' was not found. \n\n`);
      throw new Error(`Provided script with name '${this.cmd}' was not found in cli.json file.`);
    }
  }

  /*
   * Execution.
   */

  protected async executeCommands(scriptsToExecute: Array<string>): Promise<void> {
    const hasMany: boolean = (scriptsToExecute.length > 0);

    if (hasMany && this.cmdAdditionalArgs.length) {
      process.stderr.write("\nCannot parse additional args for multi-scripts.\n");
      throw new Error("Cannot provide additional args for multi-scripts.");
    }

    for (const scriptToExecute of scriptsToExecute) {
      try {
        const scriptArgs: Array<string> = scriptToExecute.split(" ");
        await this.runProcess(scriptArgs);

        if (hasMany) {
          this.onPartialSuccess(scriptToExecute);
        }
      } catch (error) {
        this.onPartialError(scriptToExecute);
        throw error;
      }

    }
  }

  protected async executeCommand(scriptToExecute: string): Promise<void> {
    try {
      const scriptArgs: Array<string> = scriptToExecute.split(" ");
      await this.runProcess(scriptArgs);
    } catch (error) {
      this.onPartialError(scriptToExecute);
      throw error;
    }
  }

  protected runProcess(args: Array<string>): Promise<void> {
    // Promise wrapper for nested callbacks handling.
    return new Promise((resolve: () => void, reject: (error: Error) => void): void => {
      try {
        this.childProcess = spawn(args[0], args.slice(1).concat(this.cmdAdditionalArgs),  {
          cwd: process.cwd(),
          detached: false,
          env: { ...process.env, PARENT: "DREAMPLATE-CLI" },
          shell: true,
          stdio: [ process.stdin, process.stdout, process.stderr ]
        });

        const checkCode = (code: number, ...args: any): void => {
          if (code === 0) {
            resolve();
            this.childProcess = null;
          } else {
            this.childProcess = null;
            reject(new Error("Command exited with non 0 code: " + code + "."));
          }
        };

        const checkError = (data: string): void => {
          reject(new Error(data.toString()));
          (this.childProcess as ChildProcess).kill(99);
        };

        this.childProcess.on("SIGINT", () => {
          reject(new Error("Process was interrupted manually."));
          (this.childProcess as ChildProcess).kill(2);
        });

        [ "uncaughtException", "unhandledRejection", "SIGUSR1", "SIGUSR2" ]
          .forEach((it: string) => this.childProcess!.on(it as any, checkError));

        this.childProcess.on("exit", checkCode);

      } catch (error) {
        reject(error);
      }
    });
  }

  /*
   * Process events.
   */

  protected onProcessShutdown(signal: NodeJS.Signals): void {
    if (this.childProcess) {
      this.childProcess.kill(signal);
      this.childProcess = null;
    }
  }

  /*
   * Event handlers.
   */

  protected onStart(addSeparator?: boolean): void {
    this.startTime = Date.now();

    if (!CommandRunner.PARENT) {
      process.stdout.write(green("\n=============================================================================\n"));
      process.stdout.write(`${green("=")} ${this.cmd} ${green("@")} ${process.cwd()} \n`);
      process.stdout.write(green("=============================================================================\n"));

      if (addSeparator) {
        process.stdout.write("\n");
      }
    }
  }

  protected onSuccess(): void {
    if (!CommandRunner.PARENT) {
      process.stdout.write(green("\n=============================================================================\n"));
      process.stdout.write(`${green("=")} Command [${this.cmd}] successfully executed in ${(Date.now() - this.startTime) / 1000} sec.\n`);
      process.stdout.write(green("=============================================================================\n\n"));
    }
  }

  protected onError(error: Error): void {
    const errorMessage: string = `= Process execution error for command '${this.cmd}'.\n= Script: [${this.script}].\n` +
      `= Error: ${error.message}\n`;

    if (!CommandRunner.PARENT) {
      process.stderr.write(red("\n=============================================================================\n"));
      process.stderr.write(errorMessage);
      process.stderr.write(red("=============================================================================\n\n"));
    }

    throw new Error(errorMessage);
  }

  protected onPartialSuccess(cmd: string): void {
    if (!CommandRunner.PARENT) {
      process.stdout.write(green(`\n + Done Command [${cmd}]. \n`));
    }
  }

  protected onPartialError(cmd: string): void {
    process.stdout.write(red(`\n - Exit Command [${cmd}]. \n`));
  }

}
