import { ChildProcess, spawn } from "child_process";
import { green, red } from "colors";

export class CommandRunner {

  protected static readonly PARENT?: string = process.env.PARENT;

  private readonly cmd: string;
  private readonly script: string | Array<string>;
  private readonly config: any;

  private finished: boolean = false;
  private startTime: number = NaN;

  private childProcess: ChildProcess | null = null;

  public constructor(cmd: string, script: string | Array<string>, config?: any) {

    this.cmd = cmd;
    this.script = script;
    this.config = config;

    process.on("exit" as any, this.onProcessShutdown.bind(this));
    process.on("disconnect" as any, this.onProcessShutdown.bind(this));
  }

  public async run(): Promise<void> {

    if (this.script) {

      this.onStart();

      try {

        await this.executeCommands(
        Array.isArray(this.script)
            ? this.script
            : this.script.split("&&").map((it: string) => it.trim()));

        this.onSuccess();

      } catch (error) {
        this.onError(error);
      } finally {
        this.finished = true;
      }

    } else {

      const errorMessage: string = `Script '${this.cmd}' was not found. \n\n`;

      process.stdout.write(errorMessage);

      throw new Error(errorMessage);
    }

  }

  /*
   * Execution.
   */

  protected async executeCommands(scriptsToExecute: Array<string>): Promise<void> {

    const hasMany: boolean = (scriptsToExecute.length > 0);

    for (const scriptToExecute of scriptsToExecute) {

      try {

        const scriptArgs: Array<string> = scriptToExecute.split(" ");
        await this.runProcess(scriptArgs[0], [...scriptArgs.slice(1)]);

        if (hasMany) {
          this.onPartialSuccess(scriptToExecute);
        }

      } catch (error) {
        this.onPartialError(scriptToExecute);
        throw error;
      }

    }
  }

  protected runProcess(item: string, args: Array<string>): Promise<void> {

    return new Promise((resolve: () => void, reject: (error: Error) => void): void => {

      try {
        this.childProcess = spawn(item, args,  {
          cwd: process.cwd(),
          detached: true,
          env: { ...process.env, PARENT: "X-CORE-CLI" },
          shell: true,
          stdio: [process.stdin, process.stdout, process.stderr]
        });

        const checkCode = (code: number): void => {
          if (code === 0) {
            resolve();
            this.childProcess = null;
          } else {
            this.childProcess = null;
            reject(new Error("Command exited with non 0 code: " + code + "."));
          }
        };

        this.childProcess.on("error", (data: string) => {
          (this.childProcess as ChildProcess).kill("1");
          reject(new Error(data.toString()));
        });
        this.childProcess.on("close", checkCode);
        this.childProcess.on("exit", checkCode);

      } catch (error) {
        reject(error);
      }
    });
  }

  /*
   * Process events.
   */

  protected onProcessShutdown(signal: string): void {

    if (this.childProcess) {
      this.childProcess.kill(signal);
      this.childProcess = null;
    }
  }

  /*
   * Event handlers.
   */

  protected onStart(): void {

    this.startTime = Date.now();

    if (!CommandRunner.PARENT) {
      process.stdout.write(green("\n=============================================================================\n"));
      process.stdout.write(`${green("=")} ${this.cmd} ${green("@")} ${process.cwd()} \n`);
      process.stdout.write(green("=============================================================================\n"));
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
      process.stdout.write(green(`\n + Done Command [${cmd}]. \n\n`));
    }
  }

  protected onPartialError(cmd: string): void {
    process.stdout.write(red(`\n - Failed Command [${cmd}]. \n`));
  }

}
