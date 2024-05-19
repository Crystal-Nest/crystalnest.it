import {Component, HostBinding, Input} from '@angular/core';

/**
 * Separator component.
 *
 * @export
 * @class SeparatorComponent
 * @typedef {SeparatorComponent}
 */
@Component({
  selector: 'cn-separator',
  standalone: true,
  imports: [],
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss'
})
export class SeparatorComponent {
  /**
   * Whether it's horizontal instead of vertical.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  @HostBinding('class.horizontal')
  public horizontal = false;
}