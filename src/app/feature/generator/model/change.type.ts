/**
 * Change to apply to a file, replacing the first value with the second one, only if the third one is true or absent.
 */
export type Change = [(string | RegExp), string] | [(string | RegExp), string, boolean];
