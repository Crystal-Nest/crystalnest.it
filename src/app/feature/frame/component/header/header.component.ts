import {Component} from '@angular/core';

import {LinkButtonComponent} from '~cn/shared/component/button/link-button/link-button.component';
import {SeparatorComponent} from '~cn/shared/component/separator/separator.component';

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
  imports: [LinkButtonComponent, SeparatorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
