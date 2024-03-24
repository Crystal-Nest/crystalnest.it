import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';

import {CnControlValueAccessor} from '../cva/control-value-accessor';

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
export class CheckboxComponent extends CnControlValueAccessor<boolean> {
  /**
   * Whether the checkbox is in the indeterminate state.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public indeterminate = false;

  @Output()
  public readonly checked: EventEmitter<boolean> = new EventEmitter();

  /**
   * Handles the checkbox change event.
   *
   * @public
   * @param {MatCheckboxChange} event
   */
  public change(event: MatCheckboxChange) {
    const {checked} = event;
    this.checked.emit(checked);
    this.onChange(checked);
    this.onTouched();
  }
}
