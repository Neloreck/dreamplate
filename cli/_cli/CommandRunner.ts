import { ChildProcess, spawn } from "child_process";
import { green, red } from "colors";

export class CommandRunner {

  protected static readonly PARENT?: string = process.env.PARENT;

  private readonly cmd: string;
  private readonly cmdAdditionalArgs: Array<string> = [];
  private readonly script: string | Array<string>;
  private readonly config: any;

  private finished: boolean = false;
  private startTime: number = NaN;

  private childProcess: ChildProcess | null = null;

  public constructor(cmd: string, cmdAdditionalArgs: Array<string>, script: string | Array<string>, config?: any) {

    this.cmd = cmd;
    this.cmdAdditionalArgs = cmdAdditionalArgs;
    this.script = script;
    this.config = config;

    process.on("exit" as any, this.onProcessShutdown.bind(this));
    process.on("disconnect" as any, this.onProcessShutdown.bind(this));
    process.on("uncaughtException" as any, this.onProcessShutdown.bind(this));
    process.on("unhandledRejection" as any, this.onProcessShutdown.bind(this));
  }

  public async run(): Promise<void> {

    if (this.script) {

      this.onStart();

      try {

        if (Array.isArray(this.script)) {
          await this.executeCommands(this.script);
        } else {
          await this.executeCommand(this.script);
        }

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

    if (hasMany && this.cmdAdditionalArgs.length) {
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

    return new Promise((resolve: () => void, reject: (error: Error) => void): void => {

      try {

        this.childProcess = spawn(args[0], args.slice(1).concat(this.cmdAdditionalArgs),  {
          cwd: process.cwd(),
          detached: true,
          env: { ...process.env, PARENT: "DREAMPLATE-CLI" },
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
            process.exit();
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
