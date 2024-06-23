import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ButtonComponent} from '~cn/shared/component/button/button/button.component';
import {LinkButtonComponent} from '~cn/shared/component/button/link-button/link-button.component';

/**
 * Homepage.
 *
 * @export
 * @class HomeComponent
 * @typedef {HomeComponent}
 */
@Component({
  selector: 'cn-home',
  standalone: true,
  imports: [RouterModule, ButtonComponent, LinkButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {}
