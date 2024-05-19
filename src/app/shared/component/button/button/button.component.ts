import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

/**
 * Button component.
 *
 * @export
 * @class ButtonComponent
 * @typedef {ButtonComponent}
 */
@Component({
  selector: 'cn-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatStepperModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  /**
   * Label.
   *
   * @public
   * @type {!string}
   */
  @Input({required: true})
  public label!: string;

  /**
   * Icon.
   *
   * @public
   * @type {!string}
   */
  @Input({required: true})
  public icon!: string;

  /**
   * Color.
   *
   * @public
   * @type {'primary' | 'accent' | 'warn'}
   */
  @Input()
  public color: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * Which kind of stepper button it is, if any.
   *
   * @public
   * @type {'next' | 'previous' | ''}
   */
  @Input()
  public stepperKind: 'next' | 'previous' | '' = '';

  /**
   * Whether it's disabled.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public isDisabled = false;
}
