import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

import {ContactButtonComponent} from '~cn/shared/component/button/contact-button/contact-button.component';
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
  imports: [RouterLink, ContactButtonComponent, SeparatorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
