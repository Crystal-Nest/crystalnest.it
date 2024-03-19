import {Component} from '@angular/core';

import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';

/**
 * Frame component.
 *
 * @export
 * @class FrameComponent
 * @typedef {FrameComponent}
 */
@Component({
  selector: 'cn-frame',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  public expandedSidebar = false;

  public toggleSidebar() {
    this.expandedSidebar = !this.expandedSidebar;
  }
}
