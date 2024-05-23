import {Component} from '@angular/core';

import {LinkButtonComponent} from '~cn/shared/component/button/link-button/link-button.component';

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
  imports: [LinkButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
