import {Component, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

import {FormComponent} from '../../../../core/abstract/form-component';
import {FormType} from '../../../../core/model/form-type.type';
import {CnCheckboxComponent} from '../../../../shared/component/checkbox/cn-checkbox.component';
import {CnInputComponent} from '../../../../shared/component/input/cn-input.component';
import {GeneratorValidators} from '../../class/GeneratorValidators.class';
import {ModIdSpecialChars} from '../../model/mod-id-special-chars.type';
import {SkeletonFormData} from '../../model/skeleton-form-data.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP} from '../../model/template.constants';

/**
 * Generator form.
 *
 * @export
 * @class CnGeneratorFormComponent
 * @typedef {CnGeneratorFormComponent}
 * @extends {FormComponent<SkeletonFormData>}
 * @implements {OnInit}
 */
@Component({
  selector: 'cn-generator-form',
  standalone: true,
  imports: [ReactiveFormsModule, CnInputComponent, CnCheckboxComponent],
  templateUrl: './cn-generator-form.component.html',
  styleUrl: './cn-generator-form.component.scss'
})
export class CnGeneratorFormComponent extends FormComponent<SkeletonFormData> implements OnInit {
  /**
   * @constructor
   * @public
   */
  public constructor() {
    super();
  }

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.valueChanges('autogenModId', value => {
      if (value) {
        this.form.controls.modId.disable();
        this.form.controls.modIdKebab.disable();
        this.updateModId(this.form.controls.modTitle.value);
      } else {
        this.form.controls.modId.enable();
        this.form.controls.modIdKebab.enable();
      }
    });
    this.valueChanges('modTitle', value => this.updateModId(value), value => !!(value && this.form.controls.autogenModId.value));
    this.valueChanges('crystalNestMod', value => {
      if (value) {
        this.form.controls.group.disable();
        this.form.controls.authors.disable();
        this.form.controls.githubOwner.disable();
        this.form.controls.group.setValue(TEMPLATE_GROUP);
        this.form.controls.authors.setValue(TEMPLATE_AUTHORS.join(', '));
        this.form.controls.githubOwner.setValue(TEMPLATE_GITHUB_USER);
        this.form.controls.group.setValidators([Validators.required]);
        this.form.controls.authors.setValidators([Validators.required]);
        this.form.controls.githubOwner.setValidators([Validators.required]);
      } else {
        this.form.controls.group.enable();
        this.form.controls.authors.enable();
        this.form.controls.githubOwner.enable();
        this.form.controls.group.setValue('');
        this.form.controls.authors.setValue('');
        this.form.controls.githubOwner.setValue('');
        this.form.controls.group.setValidators([Validators.required, GeneratorValidators.notInclude(TEMPLATE_GROUP)]);
        this.form.controls.authors.setValidators([Validators.required, GeneratorValidators.notInclude(...TEMPLATE_AUTHORS)]);
        this.form.controls.githubOwner.setValidators([Validators.required, GeneratorValidators.notMatch(TEMPLATE_GITHUB_USER)]);
      }
      this.form.controls.group.updateValueAndValidity();
      this.form.controls.authors.updateValueAndValidity();
      this.form.controls.githubOwner.updateValueAndValidity();
    });
  }

  /**
   * @inheritdoc
   *
   * @protected
   * @returns {FormType<SkeletonFormData>}
   */
  protected override initForm(): FormType<SkeletonFormData> {
    // TODO: Add tooltip next to fields
    return {
      minecraftVersion: new FormControl<SkeletonFormData['minecraftVersion']>('1.20.4', {nonNullable: true}),
      group: new FormControl(TEMPLATE_GROUP, {
        nonNullable: true,
        validators: Validators.required
      }),
      authors: new FormControl(TEMPLATE_AUTHORS.join(', '), {
        nonNullable: true,
        validators: Validators.required
      }),
      modTitle: new FormControl('Cobweb Mod Skeleton', {
        nonNullable: true,
        validators: GeneratorValidators.modTitle
      }),
      modId: new FormControl('cobweb_mod_skeleton', {
        nonNullable: true,
        validators: GeneratorValidators.modId('_')
      }),
      modIdKebab: new FormControl('cobweb-mod-template', {
        nonNullable: true,
        validators: GeneratorValidators.modId('-')
      }),
      githubOwner: new FormControl(TEMPLATE_GITHUB_USER, {
        nonNullable: true,
        validators: Validators.required
      }),
      // TODO: Make textarea properly support multiline
      description: new FormControl('MultiLoader Mod Skeleton!', {
        nonNullable: true,
        validators: Validators.required
      }),
      crystalNestMod: new FormControl(true, {
        nonNullable: true,
        validators: Validators.required
      }),
      autogenModId: new FormControl(true, {
        nonNullable: true,
        validators: Validators.required
      })
    };
  }

  /**
   * Updates `modId` and `modIdKebak` fields in accordance with `modTitle`.
   *
   * @private
   * @param {string} value
   */
  private updateModId(value: string) {
    this.form.controls.modId.setValue(this.parseModTitle(value, '_'));
    this.form.controls.modIdKebab.setValue(this.parseModTitle(value, '-'));
  }

  /**
   * Parses the mod title in a `modId`/`modIdKebab` friendly way. 
   *
   * @private
   * @param {string} value
   * @param {ModIdSpecialChars} char
   * @returns {string}
   */
  private parseModTitle(value: string, char: ModIdSpecialChars) {
    return value.toLowerCase().replaceAll(/[^0-9a-z]/g, ' ').trim().replaceAll(' ', char);
  }
}
