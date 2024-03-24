/**
 * Multiselect option.
 *
 * @export
 * @interface MultiSelectOption
 * @typedef {MultiSelectOption}
 */
export interface MultiSelectOption {
  /**
   * Value key.
   *
   * @type {string}
   */
  key: string;
  /**
   * Displayed label.
   *
   * @type {string}
   */
  label: string;
  /**
   * Whether it's selected.
   *
   * @type {boolean}
   */
  selected: boolean;
}
