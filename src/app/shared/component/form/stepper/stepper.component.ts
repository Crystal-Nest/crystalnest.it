import {CommonModule} from '@angular/common';
import {Component, ContentChildren, Input, QueryList, TemplateRef} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatStepperModule} from '@angular/material/stepper';

import {Step} from './model/step.interface';

import {StepDirective} from '~cn/shared/component/form/stepper/directive/step.directive';

@Component({
  selector: 'cn-stepper',
  standalone: true,
  imports: [CommonModule, MatStepperModule, MatIconModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  @Input({required: true})
  public steps: Step[] = [];

  @ContentChildren(StepDirective, {read: TemplateRef})
  public contents!: QueryList<TemplateRef<unknown>>;
}
