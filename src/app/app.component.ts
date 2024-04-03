import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgScrollbarModule} from 'ngx-scrollbar';

import {FrameComponent} from '~cn/feature/frame/frame.component';

/**
 * App component.
 *
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'cn-root',
  standalone: true,
  imports: [NgScrollbarModule, RouterOutlet, FrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
