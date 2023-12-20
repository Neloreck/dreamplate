import { IS_TEST } from "../config/webpack.constants";

export function asConstantsObject(target: Record<string, string | number>): Record<string, string | number> {
  if (IS_TEST) {
    return target;
  }

  const constantsObject: Record<string, number | string> = { ...target };

  for (const [key, value] of Object.entries(constantsObject)) {
    constantsObject[key] = `'${value}'`;
  }

  return constantsObject;
}
