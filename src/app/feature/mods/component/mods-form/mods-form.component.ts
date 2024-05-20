import {Component, OnInit} from '@angular/core';
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
export class ModsFormComponent extends FormComponent<ModsForm> implements OnInit {
  /**
   * @inheritdoc
   * 
   * @public
   */
  public ngOnInit(): void {
    this.formChanges(() => this.emitSubmit(), ([prev, curr], index) => index > 0 && this.validity && (Object.keys(prev) as (keyof ModsForm)[]).some(key => key !== 'advanced' && prev[key] !== curr[key]));
    this.valueChanges('advanced', value => {
      const toggle = value ? 'enable' : 'disable';
      this.form.controls.versions[toggle]();
      this.form.controls.loaders[toggle]();
      this.form.controls.client[toggle]();
      this.form.controls.server[toggle]();
      this.form.controls.wiki[toggle]();
      this.form.controls.api[toggle]();
      this.form.controls.template[toggle]();
      this.form.controls.stable[toggle]();
    }, (_, index) => index > 0 && this.validity);
  }

  /**
   * @inheritdoc
   *
   * @protected
   * @returns {FormType<ModsForm>}
   */
  protected override initForm(): FormType<ModsForm> {
    return {
      query: new FormControl('', {nonNullable: true}),
      advanced: new FormControl(false, {nonNullable: true}),
      versions: new FormControl([], {nonNullable: true}),
      loaders: new FormControl([], {nonNullable: true}),
      client: new FormControl(null),
      server: new FormControl(null),
      wiki: new FormControl(false, {nonNullable: true}),
      api: new FormControl(false, {nonNullable: true}),
      template: new FormControl(false, {nonNullable: true}),
      stable: new FormControl(false, {nonNullable: true})
    };
  }
}
