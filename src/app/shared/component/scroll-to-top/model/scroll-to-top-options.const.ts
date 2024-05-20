import {InjectionToken} from '@angular/core';

/**
 * Scroll to top options.
 *
 * @export
 * @interface ScrollToTopOptions
 * @typedef {ScrollToTopOptions}
 */
export interface ScrollToTopOptions {
  /**
   * Minimum total height of the page required to make the button visible.
   *
   * @type {number}
   */
  minPageHeight: number;
  /**
   * Minimum height to be scrolled before the button becomes visible.
   *
   * @type {number}
   */
  minScrollHeight: number;
}

/**
 * Scroll to top options injection token.
 *
 * @type {InjectionToken<ScrollToTopOptions>}
 */
export const SCROLL_TO_TOP_OPTIONS = new InjectionToken<ScrollToTopOptions>('SCROLL_TO_TOP_OPTIONS');
