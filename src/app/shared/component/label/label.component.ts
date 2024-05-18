import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

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
  @Input({required: true})
  public label!: string;

  @Input({required: true})
  public value!: string[] | string | number | boolean | null | undefined;

  @Input()
  public icons: string | string[] = '';

  public get displayValue() {
    return Array.isArray(this.value) ? this.value.join(', ') : this.value ?? '-';
  }

  public get values() {
    return Array.isArray(this.value) ? this.value.map((value, index) => this.buildItem(value, index)) : [this.buildItem(this.value)];
  }

  private buildItem(value: string | number | boolean | null | undefined, index: number = 0) {
    return {
      value: value ?? '-',
      icon: typeof this.icons === 'string' ? this.icons : this.icons[index]
    };
  }
}
