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
  @Input({required: true})
  public options: Record<string, string> = {};

  @Input()
  public allowDeselect = false;

  @Input()
  public multiple = false;

  public get choices() {
    return Object.entries(this.options);
  }

  public selectionChange(event: MatSelectChange) {
    this.writeValue(event.value);
  }
}
