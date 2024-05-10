import {CommonModule} from '@angular/common';
import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';

import {Step} from './model/step.interface';
import {ButtonComponent} from '../../button/button/button.component';

import {StepDirective} from '~cn/shared/component/form/stepper/directive/step.directive';

/**
 * Stepper component.
 *
 * @export
 * @class StepperComponent
 * @typedef {StepperComponent}
 */
@Component({
  selector: 'cn-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule, ButtonComponent],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  /**
   * List of steps.
   *
   * @public
   * @type {Step[]}
   */
  @Input({required: true})
  public steps: Step[] = [];

  /**
   * Children step.
   *
   * @public
   * @type {!QueryList<TemplateRef<unknown>>}
   */
  @ContentChildren(StepDirective, {read: TemplateRef})
  public contents!: QueryList<TemplateRef<unknown>>;
}
