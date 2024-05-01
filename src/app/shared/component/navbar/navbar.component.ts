import {Component, Input} from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';

import {Icon} from '../icon/icon.component';
import {LinkComponent} from '../link/link.component';

/**
 * NavbarLink interface.
 *
 * @interface NavbarLink
 * @typedef {NavbarLink}
 */
export interface NavbarLink {
  text?: string;
  icon?: Icon;
  to: string;
  size?: boolean;
  left?: boolean;
}

/**
 * Navigation bar component.
 *
 * @export
 * @class NavigationBarComponent
 * @typedef {NavbarComponent}
 */
@Component({
  selector: 'cn-navbar',
  standalone: true,
  imports: [LinkComponent, MatNavList, MatListItem],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input()
  public vertical = false;

  @Input({required: true})
  public links!: NavbarLink[];
}
