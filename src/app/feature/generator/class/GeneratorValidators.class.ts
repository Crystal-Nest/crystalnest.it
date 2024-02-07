import {ValidatorFn, Validators} from '@angular/forms';

import {ModIdSpecialChar} from '../model/mod-id-special-char.type';

/**
 * Generator form validators.
 *
 * @export
 * @class GeneratorValidators
 * @typedef {GeneratorValidators}
 */
export class GeneratorValidators {
  /**
   * Mod ID related fields minimum length.
   *
   * @private
   * @static
   * @readonly
   * @type {3}
   */
  private static readonly modIdMinLength = 3;

  /**
   * Mod ID related fields maximum length.
   *
   * @private
   * @static
   * @readonly
   * @type {63}
   */
  private static readonly modIdMaxLength = 63;

  /**
   * Mod title field validators.
   *
   * @public
   * @static
   * @readonly
   * @type {ValidatorFn[]}
   */
  public static readonly modTitle: ValidatorFn[] = [Validators.required, Validators.minLength(this.modIdMinLength), Validators.maxLength(this.modIdMaxLength)];

  /**
   * Checks whether the value does not include any of the given values.  
   * Case-insensitive.
   *
   * @public
   * @static
   * @param {...string[]} values
   * @returns {ValidatorFn}
   */
  public static notInclude(...values: string[]): ValidatorFn {
    return control => {
      if (control.value && typeof control.value === 'string' && values.some(value => control.value.toLowerCase().includes(value.toLowerCase()))) {
        return {notInclude: true};
      }
      return null;
    };
  }

  /**
   * Checks whether the value is different from all of the given values.  
   * Case-insensitive.
   *
   * @public
   * @static
   * @param {...string[]} values
   * @returns {ValidatorFn}
   */
  public static notMatch(...values: string[]): ValidatorFn {
    return control => {
      if (control.value && values.some(value => control.value.toLowerCase() === value.toLowerCase())) {
        return {notMatch: true};
      }
      return null;
    };
  }

  /**
   * Same checks as {@link modTitle}, but with a check for the `[a-z0-9${char}]+` pattern too.
   *
   * @public
   * @static
   * @param {ModIdSpecialChar} char
   * @returns {ValidatorFn[]}
   */
  public static modId(char: ModIdSpecialChar): ValidatorFn[] {
    return [...GeneratorValidators.modTitle, Validators.pattern(`[a-z0-9${char}]+`)];
  }
}
