import {Component} from '@angular/core';

import {ContactButtonComponent} from '~cn/shared/component/button/contact-button/contact-button.component';

/**
 * Footer component.
 *
 * @export
 * @class FooterComponent
 * @typedef {FooterComponent}
 */
@Component({
  selector: 'cn-footer',
  standalone: true,
  imports: [ContactButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
