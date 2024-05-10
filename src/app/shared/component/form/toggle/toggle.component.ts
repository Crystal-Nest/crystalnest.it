import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';

import {CnControlValueAccessor} from '../cva/control-value-accessor';

/**
 * Crystal Nest toggle component.
 *
 * @export
 * @class ToggleComponent
 * @typedef {ToggleComponent}
 * @extends {CnControlValueAccessor<boolean>}
 */
@Component({
  selector: 'cn-toggle',
  standalone: true,
  imports: [FormsModule, MatSlideToggleModule],
  templateUrl: 'toggle.component.html',
  styleUrl: 'toggle.component.scss'
})
export class ToggleComponent extends CnControlValueAccessor<boolean> {
  /**
   * Emits an event when the toggle changes state.
   *
   * @public
   * @readonly
   * @type {EventEmitter<boolean>}
   */
  @Output()
  public readonly checked: EventEmitter<boolean> = new EventEmitter();

  /**
   * Handles the toggle change event.
   *
   * @public
   * @param {MatSlideToggleChange} event
   */
  public change(event: MatSlideToggleChange) {
    const {checked} = event;
    this.checked.emit(checked);
    this.onChange(checked);
    this.onTouched();
  }
}
