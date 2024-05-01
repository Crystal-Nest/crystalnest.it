import {Component, Input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

import {Icon, IconComponent} from '../icon/icon.component';

/**
 * Navigation link component.
 *
 * @export
 * @class LinkComponent
 * @typedef {LinkComponent}
 */
@Component({
  selector: 'cn-link',
  standalone: true,
  imports: [RouterLink, MatIcon, IconComponent],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss'
})
export class LinkComponent {
  @Input({required: true})
  public to!: string;

  @Input()
  public text? = '';

  @Input()
  public icon?: Icon;

  @Input()
  public remote? = false;
}
