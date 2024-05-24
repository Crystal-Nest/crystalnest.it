import {AsyncPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {GeneratorFormComponent} from './component/generator-form/generator-form.component';
import {SkeletonForm} from './model/skeleton-form.interface';
import {generateMod, retrieveTemplateMinecraftVersions} from './redux/actions';
import {State, generatorFeature} from './redux/feature';
import {TemplateService} from './service/template.service';

import {SubscriberComponent} from '~cn/core/abstract/subscriber.component';

/**
 * MultiLoader Skeleton Generator.
 *
 * @export
 * @class GeneratorComponent
 * @typedef {GeneratorComponent}
 * @extends {SubscriberComponent}
 */
@Component({
  selector: 'cn-generator',
  standalone: true,
  imports: [AsyncPipe, HttpClientModule, GeneratorFormComponent],
  providers: [TemplateService],
  templateUrl: './generator.component.html',
  styleUrl: './generator.component.scss'
})
export class GeneratorComponent extends SubscriberComponent {
  /**
   * Available Minecraft versions.
   *
   * @public
   * @readonly
   * @type {Record<MinecraftVersion, MinecraftVersion>}
   */
  public readonly versions$ = this.store$.select(generatorFeature.selectMinecraftVersions);

  /**
   * Form persistance data.
   *
   * @public
   * @readonly
   * @type {Observable<SkeletonForm | null>}
   */
  public readonly form$ = this.store$.select(generatorFeature.selectForm);

  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   */
  public constructor(private readonly store$: Store<State>) {
    super();
    this.store$.dispatch(retrieveTemplateMinecraftVersions());
  }

  /**
   * Builds the mod skeleton with the specified properties.
   *
   * @public
   * @param {SkeletonForm} form
   */
  public buildSkeleton(form: SkeletonForm) {
    this.store$.dispatch(generateMod(form));
  }
}
