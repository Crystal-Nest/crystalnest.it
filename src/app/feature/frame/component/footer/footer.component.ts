import {Component} from '@angular/core';

import {LinkButtonComponent} from '~cn/shared/component/button/link-button/link-button.component';
import {SeparatorComponent} from '~cn/shared/component/separator/separator.component';

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
  imports: [LinkButtonComponent, SeparatorComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
