// eslint-disable-next-line no-redeclare
import {AnimationEvent} from '@angular/animations';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';

import {CrystalNestIcon} from '~cn/core/model/icon-repository.const';
import {NavbarComponent, NavbarLink} from '~cn/shared/component/navbar/navbar.component';

/**
 * Sidebar component.
 *
 * @export
 * @class SidebarComponent
 * @typedef {SidebarComponent}
 */
@Component({
  selector: 'cn-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    NavbarComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public links: NavbarLink[] = [
    {
      to: '/generator',
      icon: {name: CrystalNestIcon.modIcon['cobweb-mod-template']},
      text: 'Generator'
    }
  ];

  public expanded = false;

  public toggleSidebar() {
    this.expanded = !this.expanded;
  }

  public close() {
    this.expanded = false;
  }
}
