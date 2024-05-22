import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';

import {CnControlValueAccessor} from '../cva/control-value-accessor';

/**
 * Shorthand for nullable boolean.
 *
 * @typedef {NullableBoolean}
 */
type NullableBoolean = boolean | null;

/**
 * Crystal Nest checkbox component.
 *
 * @export
 * @class CheckboxComponent
 * @typedef {CheckboxComponent}
 * @extends {CnControlValueAccessor<boolean>}
 */
@Component({
  selector: 'cn-checkbox',
  standalone: true,
  imports: [FormsModule, MatCheckboxModule],
  templateUrl: 'checkbox.component.html',
  styleUrl: 'checkbox.component.scss'
})
export class CheckboxComponent extends CnControlValueAccessor<NullableBoolean> {
  /**
   * Whether the checkbox is in the indeterminate state.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public indeterminate = false;

  /**
   * Whether the checkbox should automatically use the {@link indeterminate} value to behave as tristate checkbox.  
   * When this is set to `true`, {@link indeterminate} should not be changed externally as it will be handled internally.  
   * {@link indeterminate} can be set to a fixed value externally as this will only affect the initial state, but no further changes should be made.  
   * If you need to check whether the checkbox is in the indeterminate state, you can check whether its value is `null`.  
   * Similarly, setting the checkbox value to `null` will set {@link indeterminate} to `true`, the opposite happens when setting the checkbox to either `true` or `false`.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public tristate = false;

  /**
   * Emits an event when the checkbox changes state.
   *
   * @public
   * @readonly
   * @type {EventEmitter<NullableBoolean>}
   */
  @Output()
  public readonly checked = new EventEmitter<NullableBoolean>();

  /**
   * Handles the checkbox change event.
   *
   * @public
   * @param {MatCheckboxChange} event
   */
  public change(event: MatCheckboxChange) {
    let {checked}: {checked: NullableBoolean} = event;
    if (this.tristate && checked) {
      this.indeterminate = !this.indeterminate;
      if (this.indeterminate) {
        this.writeValue(null);
        checked = null;
      }
    }
    this.checked.emit(checked);
    this.onChange(checked);
    this.onTouched();
  }

  /**
   * @inheritdoc
   *
   * @protected
   */
  protected override setValue(): void {
    this.indeterminate = this.value === null;
  }
}
