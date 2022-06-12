import { EWebpackFlag } from "../config/webpack.flags";

export function setupEnvironmentFlags(args: Array<string>): { entries: Array<string>, flags: Array<string> } {
  const availableFlags: Array<string> = Object.values(EWebpackFlag);
  const params: Array<string> = args.slice(2);
  const entries: Array<string> = params.filter((it: string) => it && !it.startsWith("--"));
  const flags: Array<string> = params
    .filter((it: string) => it.startsWith("--") && availableFlags.includes(it.slice(2)))
    .map((it: string) => it.slice(2));

  /**
   * Handle flags for additional build features.
   */
  flags.forEach((it: string) => {
    process.env[it] = "true";
  });

  /**
   * Handle entries selection for optional serving.
   */
  if (entries.length !== 0) {
    process.env[EWebpackFlag.ENTRIES] = JSON.stringify(entries);
  }

  return {
    entries,
    flags
  };
}
