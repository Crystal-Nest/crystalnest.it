import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

/**
 * Label value.
 *
 * @typedef {Value}
 */
type Value = string | number | boolean | null | undefined;

/**
 * Displayable value.
 *
 * @interface DisplayValue
 * @typedef {DisplayValue}
 */
interface DisplayValue {
  /**
   * Actual value to display.
   *
   * @type {string | number | boolean}
   */
  value: string | number | boolean;
  /**
   * Optional icon.
   *
   * @type {?string}
   */
  icon?: string;
}

/**
 * Label component.
 *
 * @export
 * @class LabelComponent
 * @typedef {LabelComponent}
 */
@Component({
  selector: 'cn-label',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  /**
   * Label.
   *
   * @public
   * @type {!string}
   */
  @Input({required: true})
  public label!: string;

  /**
   * Value to display.
   *
   * @public
   * @type {!(Value[] | Value)}
   */
  @Input({required: true})
  public value!: Value[] | Value;

  /**
   * List of icons, paired with the corresponding value.  
   * If a single icon is provided as a `string` instead of a `string[]`, the icon will be used for all values.
   *
   * @public
   * @type {string | string[]}
   */
  @Input()
  public icons: string | string[] = '';

  /**
   * Values to display.
   *
   * @public
   * @readonly
   * @type {DisplayValue[]}
   */
  public get values(): DisplayValue[] {
    return Array.isArray(this.value) ? this.value.map((value, index) => this.buildItem(value, index)) : [this.buildItem(this.value)];
  }

  /**
   * Builds a display item.
   *
   * @private
   * @param {Value} value
   * @param {number} [index=0]
   * @returns {DisplayValue}
   */
  private buildItem(value: Value, index = 0): DisplayValue {
    return {
      value: value ?? '-',
      icon: typeof this.icons === 'string' ? this.icons : this.icons[index]
    };
  }
}
