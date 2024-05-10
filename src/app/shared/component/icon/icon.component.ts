import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {IconSize} from '~cn/core/model/icons.const';

/**
 * Icon component.
 *
 * @export
 * @class IconComponent
 * @typedef {IconComponent}
 */
@Component({
  selector: 'cn-icon',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  /**
   * Icon reference.
   *
   * @public
   * @type {!string}
   */
  @Input({required: true})
  public icon!: string;

  /**
   * Icon size.
   *
   * @public
   * @type {IconSize | number}
   */
  @Input()
  public size: IconSize | number = IconSize.S;
}
