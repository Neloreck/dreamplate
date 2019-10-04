import { TBreakpoint } from "@Lib/theme/types";

export const BREAKPOINT = {
  lg: 1280,
  md: 960,
  sm: 600,
  xl: 1920,
  xs: 0
};

export const up = (min: TBreakpoint): string => `@media(min-width: ${BREAKPOINT[min]}px)`;

export const down = (max: TBreakpoint): string => `@media(max-width: ${BREAKPOINT[max]}px)`;
