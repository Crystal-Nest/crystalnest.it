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
  @Input({required: true})
  public link = '';

  @Input()
  public icon = '';

  @Input()
  public text = '';
}
