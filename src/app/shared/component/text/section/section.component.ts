import {Component, Input} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';

import {ROUTE} from '~cn/core/model/route.enum';

/**
 * Section component.
 *
 * @export
 * @class SectionComponent
 * @typedef {SectionComponent}
 */
@Component({
  selector: 'cn-section',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatDividerModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  /**
   * Current page route.
   *
   * @public
   * @type {!`${ROUTE}`}
   */
  @Input({required: true})
  public route!: `${ROUTE}`;

  /**
   * Title fragment for link navigation.
   *
   * @public
   * @type {string}
   */
  @Input({required: true})
  public fragment = '';

  /**
   * Title display text.
   *
   * @public
   * @type {string}
   */
  @Input({required: true})
  public title = '';
}
