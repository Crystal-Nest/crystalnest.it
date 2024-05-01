import {Component, Input} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {IconSize} from '~cn/core/model/icon-repository.const';

export interface Icon {
  name: string;
  size?: IconSize | number;
}

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
  @Input({required: true})
  public icon!: string;

  @Input()
  public size: IconSize | number = IconSize.S;
}
