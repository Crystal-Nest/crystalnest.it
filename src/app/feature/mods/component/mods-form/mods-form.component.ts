import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

import {ModsForm} from '../../model/mods-form.interface';

import {FormComponent} from '~cn/core/abstract/form-component';
import {FormType} from '~cn/core/model/form-type.type';
import {ButtonComponent} from '~cn/shared/component/button/button/button.component';
import {CardComponent} from '~cn/shared/component/card/card.component';
import {CheckboxComponent} from '~cn/shared/component/form/checkbox/checkbox.component';
import {InputComponent} from '~cn/shared/component/form/input/input.component';

/**
 * Generator form.
 *
 * @export
 * @class ModsFormComponent
 * @typedef {ModsFormComponent}
 * @extends {FormComponent<SkeletonForm>}
 * @implements {OnInit}
 */
@Component({
  selector: 'cn-mods-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    CardComponent
  ],
  templateUrl: './mods-form.component.html',
  styleUrl: './mods-form.component.scss'
})
export class ModsFormComponent extends FormComponent<ModsForm> {
  /**
   * @inheritdoc
   *
   * @protected
   * @returns {FormType<ModsForm>}
   */
  protected override initForm(): FormType<ModsForm> {
    return {
      query: new FormControl('', {nonNullable: true}),
      client: new FormControl(false),
      server: new FormControl(false)
    };
  }
}
