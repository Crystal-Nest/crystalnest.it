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
  @Input({required: true})
  public label!: string;

  @Input({required: true})
  public icon!: string;

  @Input()
  public color: 'primary' | 'accent' | 'warn' = 'primary';

  @Input()
  public stepperKind: 'next' | 'previous' | '' = '';

  @Input()
  public isDisabled = false;
}
