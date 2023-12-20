export type TBreakpoint = "xs" | "sm" | "md" | "lg";

export function up(breakpoint: TBreakpoint): string;

export function down(breakpoint: TBreakpoint): string;
