import {TypedChange} from './typed-change.class';

/**
 * Typed {@link SimpleChanges}.
 *
 * @typedef {TypedChanges}
 * @template T
 */
export type TypedChanges<T> = {
  [K in keyof T]?: TypedChange<T[K]>
};
