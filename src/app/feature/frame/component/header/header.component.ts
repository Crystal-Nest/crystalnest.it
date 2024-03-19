import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

/**
 * Header component.
 *
 * @export
 * @class HeaderComponent
 * @typedef {HeaderComponent}
 */
@Component({
  selector: 'cn-header',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output()
  public readonly toggleSidebar = new EventEmitter<void>();

  public emitToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
