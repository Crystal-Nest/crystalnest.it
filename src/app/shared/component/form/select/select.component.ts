import {Component, Input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

import {CnControlValueAccessor} from '../cva/control-value-accessor';

/**
 * Crystal Nest select component.
 *
 * @export
 * @class SelectComponent
 * @typedef {SelectComponent}
 * @extends {CnControlValueAccessor<string>}
 */
@Component({
  selector: 'cn-select',
  standalone: true,
  imports: [FormsModule, MatSelectModule, MatIconModule],
  templateUrl: 'select.component.html',
  styleUrl: 'select.component.scss'
})
export class SelectComponent extends CnControlValueAccessor<string | string[]> {
  /**
   * Selectable options.
   *
   * @public
   * @type {Record<string, string>}
   */
  @Input({required: true})
  public options: Record<string, string> = {};

  /**
   * Whether to display a blank option.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public allowDeselect = false;

  /**
   * Whether multiple values can be selected at a time.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public multiple = false;

  /**
   * List of selectable choices. 
   *
   * @public
   * @readonly
   * @type {[string, string][]}
   */
  public get choices() {
    return Object.entries(this.options);
  }

  /**
   * Handles the selection event.
   *
   * @public
   * @param {MatSelectChange} event
   */
  public selectionChange(event: MatSelectChange) {
    this.writeValue(event.value);
  }
}
