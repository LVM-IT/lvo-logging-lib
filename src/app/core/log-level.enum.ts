/**
 * enum of the supported LogLevel
 *
 * Please do not use DONOTUSE: it's just a workaround for the TS2678 Compile Message Problem
 */
export enum LogLevel {
  // Level goes from very verbose to quiet
  DONOTUSE,
  Verbose,
  Debug,
  Info,
  Warning,
  Error,
  Critical,
  Quiet,
}
