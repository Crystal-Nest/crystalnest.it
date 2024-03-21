// eslint-disable-next-line no-redeclare
import {animate, state, style, transition, trigger, AnimationEvent} from '@angular/animations';
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
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('toggle', [
      state('collapsed', style({width: '64px'})),
      state('expanded', style({width: '371px'})),
      transition('expanded => collapsed', animate('0.2s')),
      transition('collapsed => expanded', animate('0.2s'))
    ])
  ]
})
export class SidebarComponent {
  public expanded = false;

  public showWritings = false;

  public toggleSidebar() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      this.showWritings = true;
    }
  }

  public close() {
    this.expanded = false;
  }

  public onToggleDone(event: AnimationEvent) {
    this.showWritings = event.toState !== 'collapsed';
  }
}
