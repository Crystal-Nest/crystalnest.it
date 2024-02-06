import {SimpleChange} from '@angular/core';

/**
 * Typed {@link SimpleChange}.
 *
 * @class TypedChange
 * @typedef {TypedChange}
 * @template T
 * @extends {SimpleChange}
 */
export class TypedChange<T> extends SimpleChange {
  /**
   * @constructor
   * @public
   * @param {T} previousValue
   * @param {T} currentValue
   * @param {boolean} firstChange
   */
  public constructor(public override previousValue: T, public override currentValue: T, firstChange: boolean) {
    super(previousValue, currentValue, firstChange);
  }
}

/**
 * Typed {@link SimpleChanges}.
 *
 * @typedef {TypedChanges}
 * @template T
 */
export type TypedChanges<T> = {
  [K in keyof T]?: TypedChange<T[K]>
};
