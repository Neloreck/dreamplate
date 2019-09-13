/**
 * @module @lib
 */

import { Styles, StyleSheetFactoryOptions } from "jss";
import { ClassType } from "react";
import { default as withStyles } from "react-jss";

/**
 * Style generator based on theme.
 */
type TThemedStyles<Theme> = (theme: Theme) => Styles<string>;

/**
 * Inject JSS withStyles HOC via decorator.
 */
export const Styled = <S extends Styles<string> | TThemedStyles<any>, P>(
  styles: S,
  options?: StyleSheetFactoryOptions
): ClassDecorator => {
  return (target: ClassType<P, any, any>): ClassType<P, any, any> => {
    return withStyles(styles, options)(target);
  };
};
