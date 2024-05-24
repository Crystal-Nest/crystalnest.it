import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

import {MinecraftVersion} from '../../../../core/model/minecraft-version.type';
import {MOD_LOADERS} from '../../../../core/model/mod-loader.type';
import {GeneratorValidators} from '../../class/generator-validators.class';
import {ModIdSpecialChar} from '../../model/mod-id-special-char.type';
import {Platform} from '../../model/platform.type';
import {SkeletonForm} from '../../model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP} from '../../model/template.const';

import {FormComponent} from '~cn/core/abstract/form-component';
import {FormType} from '~cn/core/model/form-type.type';
import {TypedChanges} from '~cn/core/model/typed-changes.type';
import {ButtonComponent} from '~cn/shared/component/button/button/button.component';
import {CheckboxComponent} from '~cn/shared/component/form/checkbox/checkbox.component';
import {InputComponent} from '~cn/shared/component/form/input/input.component';
import {SelectComponent} from '~cn/shared/component/form/select/select.component';
import {StepDirective} from '~cn/shared/component/form/stepper/directive/step.directive';
import {Step} from '~cn/shared/component/form/stepper/model/step.interface';
import {StepperComponent} from '~cn/shared/component/form/stepper/stepper.component';
import {TextareaComponent} from '~cn/shared/component/form/textarea/textarea.component';
import {ToggleComponent} from '~cn/shared/component/form/toggle/toggle.component';

/**
 * Generator form.
 *
 * @export
 * @class GeneratorFormComponent
 * @typedef {GeneratorFormComponent}
 * @extends {FormComponent<SkeletonForm>}
 * @implements {OnInit}
 */
@Component({
  selector: 'cn-generator-form',
  standalone: true,
  imports: [
    StepDirective,
    MatIconModule,
    ReactiveFormsModule,
    InputComponent,
    CheckboxComponent,
    StepperComponent,
    ToggleComponent,
    SelectComponent,
    ButtonComponent,
    TextareaComponent
  ],
  templateUrl: './generator-form.component.html',
  styleUrl: './generator-form.component.scss'
})
export class GeneratorFormComponent extends FormComponent<SkeletonForm> implements OnInit, OnChanges {
  /**
   * Available Minecraft versions.
   *
   * @public
   * @type {!(Record<MinecraftVersion, MinecraftVersion> | null)}
   */
  @Input({
    required: true,
    transform: (value: Record<MinecraftVersion, MinecraftVersion> | null) => value ? value : {}
  })
  public versions!: Record<MinecraftVersion, MinecraftVersion>;

  /**
   * List of form steps.
   *
   * @public
   * @readonly
   * @type {Step[]}
   */
  public readonly steps: Step[] = [
    {
      label: 'Minecraft and loaders'
    },
    {
      label: 'Project details'
    },
    {
      label: 'Project description',
      hasNext: () => !this.form.controls.crystalNestMod.value
    },
    {
      label: 'Ownership',
      isVisible: () => !this.form.controls.crystalNestMod.value
    }
  ];

  /**
   * Available mod loaders.
   *
   * @public
   * @readonly
   * @type {Record<Lowercase<ModLoader>, ModLoader>}
   */
  public readonly loaders = MOD_LOADERS;

  /**
   * Available publishing platforms.
   *
   * @public
   * @readonly
   * @type {Record<Lowercase<Platform>, Platform>}
   */
  public readonly platforms: Record<Lowercase<Platform>, Platform> = {
    maven: 'Maven',
    github: 'GitHub',
    modrinth: 'Modrinth',
    curseforge: 'CurseForge'
  };

  /**
   * @inheritdoc
   *
   * @public
   * @param {TypedChanges<GeneratorFormComponent>} changes
   */
  public override ngOnChanges(changes: TypedChanges<GeneratorFormComponent>): void {
    if (changes.versions) {
      this.form.controls.minecraftVersion.setValue(Object.values(this.versions)[0] as MinecraftVersion);
    }
  }

  /**
   * @inheritdoc
   * 
   * @public
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
    this.valueChanges(
      'modTitle',
      value => this.updateModId(value),
      value => (value ?? 0) === value && this.form.controls.autogenModId.value
    );
    this.valueChanges('crystalNestMod', value => {
      if (value) {
        this.form.controls.group.disable();
        this.form.controls.authors.disable();
        this.form.controls.githubUser.disable();
        this.form.controls.group.setValue(TEMPLATE_GROUP);
        this.form.controls.authors.setValue(TEMPLATE_AUTHORS.join(', '));
        this.form.controls.githubUser.setValue(TEMPLATE_GITHUB_USER);
        this.form.controls.group.setValidators([Validators.required]);
        this.form.controls.authors.setValidators([Validators.required]);
        this.form.controls.githubUser.setValidators([Validators.required]);
      } else {
        this.form.controls.group.enable();
        this.form.controls.authors.enable();
        this.form.controls.githubUser.enable();
        this.form.controls.group.setValue('');
        this.form.controls.authors.setValue('');
        this.form.controls.githubUser.setValue('');
        this.form.controls.group.setValidators([
          Validators.required,
          GeneratorValidators.notInclude(
            TEMPLATE_GROUP,
            '.idea',
            'common',
            'fabric',
            'forge',
            'neoforge',
            'gradle',
            'wrapper',
            'src',
            'main',
            'java',
            'resources',
            'mixin',
            'platform',
            'model',
            'services',
            'META-INF'
          ),
          Validators.pattern('^([a-z]+(\.|_))*[a-z]+$')
        ]);
        this.form.controls.authors.setValidators([Validators.required, GeneratorValidators.notInclude(...TEMPLATE_AUTHORS)]);
        this.form.controls.githubUser.setValidators([Validators.required, GeneratorValidators.notMatch(TEMPLATE_GITHUB_USER)]);
      }
      this.form.controls.group.updateValueAndValidity();
      this.form.controls.authors.updateValueAndValidity();
      this.form.controls.githubUser.updateValueAndValidity();
    });
  }

  /**
   * @inheritdoc
   *
   * @protected
   * @returns {FormType<SkeletonForm>}
   */
  protected override initForm(): FormType<SkeletonForm> {
    return {
      minecraftVersion: new FormControl('' as MinecraftVersion, {
        nonNullable: true,
        validators: Validators.required
      }),
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
      loaders: new FormControl(['fabric', 'forge', 'neoforge'], {
        nonNullable: true,
        validators: Validators.required
      }),
      platforms: new FormControl(
        [
          'maven',
          'github',
          'modrinth',
          'curseforge'
        ],
        {
          nonNullable: true,
          validators: Validators.required
        }
      ),
      githubUser: new FormControl(TEMPLATE_GITHUB_USER, {
        nonNullable: true,
        validators: Validators.required
      }),
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
      }),
      includeConfig: new FormControl(true, {
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
   * @param {ModIdSpecialChar} char
   * @returns {string}
   */
  private parseModTitle(value: string, char: ModIdSpecialChar) {
    return value.toLowerCase().replaceAll(/[^0-9a-z]/g, ' ').trim().replaceAll(' ', char);
  }
}
