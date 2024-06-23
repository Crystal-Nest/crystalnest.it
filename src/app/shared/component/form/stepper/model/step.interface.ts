/**
 * Stepper step.
 *
 * @export
 * @interface Step
 * @typedef {Step}
 */
export interface Step {
  /**
   * Label (title).
   *
   * @type {string}
   */
  label: string;
  /**
   * Whether the step should show the [Back] button.
   *
   * @type {?() => boolean}
   */
  hasBack?: () => boolean;
  /**
   * Whether the step should show the [Next] button.
   *
   * @type {?() => boolean}
   */
  hasNext?: () => boolean;
  /**
   * Whether the step should be visible.
   *
   * @type {?() => boolean}
   */
  isVisible?: () => boolean;
  /**
   * Whether the step should display the error state in the top label.
   *
   * @type {?() => boolean}
   */
  hasErrors?: () => boolean;
}
