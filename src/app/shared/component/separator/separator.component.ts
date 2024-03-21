import {Component, Input} from '@angular/core';

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
  @Input()
  public horizontal = false;
}
