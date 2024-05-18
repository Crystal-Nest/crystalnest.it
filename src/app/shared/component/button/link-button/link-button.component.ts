import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';

/**
 * Link button component.
 *
 * @export
 * @class LinkButtonComponent
 * @typedef {LinkButtonComponent}
 */
@Component({
  selector: 'cn-link-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './link-button.component.html',
  styleUrl: './link-button.component.scss'
})
export class LinkButtonComponent {
  /**
   * Link.
   *
   * @public
   * @type {string}
   */
  @Input({required: true})
  public link = '';

  /**
   * Optional image.  
   * At least one of {@link icon} and {@link text} must be set.
   *
   * @public
   * @type {string}
   */
  @Input()
  public icon = '';

  /**
   * Optional text.  
   * At least one of {@link icon} and {@link text} must be set.
   *
   * @public
   * @type {string}
   */
  @Input()
  public text = '';

  /**
   * Whether to disable navigation.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public disabled = false;
}
