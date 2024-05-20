import {Component, HostBinding, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {SCROLL_TO_TOP_OPTIONS, ScrollToTopOptions} from './model/scroll-to-top-options.const';

/**
 * Scroll-to-top component.
 *
 * @export
 * @class ScrollToTopComponent
 * @typedef {ScrollToTopComponent}
 */
@Component({
  selector: 'cn-scroll-to-top',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss'
})
export class ScrollToTopComponent {
  /**
   * Whether the component is visible.
   *
   * @public
   * @type {boolean}
   */
  @HostBinding('class.visible')
  public visible = false;

  /**
   * @constructor
   * @public
   * @param {ScrollToTopOptions} scrollToTopOptions
   */
  public constructor(@Inject(SCROLL_TO_TOP_OPTIONS) private readonly scrollToTopOptions: ScrollToTopOptions) {
    window.addEventListener('scroll', () => (this.visible = window.scrollY > this.scrollToTopOptions.minScrollHeight && document.body.scrollHeight > this.scrollToTopOptions.minPageHeight));
  }

  /**
   * Scrolls to the top of the page.
   *
   * @public
   */
  public scroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
