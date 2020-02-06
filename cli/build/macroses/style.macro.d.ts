export type TBreakpoint = "xs" | "sm" | "md" | "lg";

export const up: (breakpoint: TBreakpoint) => string;

export const down: (breakpoint: TBreakpoint) => string;
