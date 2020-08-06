import { IS_TEST } from "../config/webpack.constants";

export const asConstantsObject = (target: { [index: string]: string | number }) => {
  if (IS_TEST) {
    return target;
  }

  const constantsObject: { [index: string]: string | number } = { ...target };

  for (const [ key, value ] of Object.entries(constantsObject)) {
    constantsObject[key] = `'${value}'`;
  }

  return constantsObject;
};
