// eslint-disable-next-line no-redeclare
import {AnimationEvent} from '@angular/animations';
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';

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
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public expanded = false;

  public toggleSidebar() {
    this.expanded = !this.expanded;
  }

  public close() {
    this.expanded = false;
  }
}
