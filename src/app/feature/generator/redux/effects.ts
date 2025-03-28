import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import JSZip from '@progress/jszip-esm';
import {filter, map, switchMap, withLatestFrom} from 'rxjs';

import {buildMod, generateMod, retrieveTemplateMinecraftVersions, saveForm, saveTemplateAndForm, saveTemplateMinecraftVersions} from './actions';
import {State, generatorFeature} from './feature';
import {TemplateProcessorNew} from '../class/template-processor-new.class';
import {TemplateProcessorOld} from '../class/template-processor-old.class';
import {TemplateProcessor} from '../class/template-processor.class';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {LicenseService} from '../service/license.service';
import {TemplateService} from '../service/template.service';

import {observe} from '~cn/core/function/core.function';
import {decrementCallCounter, download, incrementCallCounter, saveLoadingType, saveProgress} from '~cn/core/redux/actions';

/**
 * Generator effects.
 *
 * @export
 * @class GeneratorEffects
 * @typedef {GeneratorEffects}
 */
@Injectable()
export class GeneratorEffects {
  /**
   * Minecraft minor version since when the new processor is required.
   *
   * @private
   * @readonly
   * @type {21}
   */
  private readonly newProcessorVersion = 21;

  /**
   * Intercepts the action {@link retrieveTemplateMinecraftVersions} to retrieve the list of available mod template Minecraft versions and,
   * if it wasn't retireved already, calls {@link TemplateService.getMinecraftVersions getMinecraftVersions} to retrieve it,
   * then emits the action {@link saveTemplateMinecraftVersions} to save it.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Generator] Save template Minecraft versions">}
   */
  public readonly retrieveTemplateMinecraftVersions$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveTemplateMinecraftVersions),
    withLatestFrom(this.store$.select(generatorFeature.selectMinecraftVersions)),
    filter(([, versions]) => !Object.keys(versions).length),
    switchMap(() => this.templateService.getMinecraftVersions().pipe(
      map(versions => saveTemplateMinecraftVersions({minecraftVersions: versions.reverse().reduce((prev, curr) => ({
        ...prev,
        [curr.name]: curr.name
      }), {})}))
    ))
  ));

  /**
   * Intercepts the action {@link generateMod} to start the mod generation flow and,
   * if the template for the specified version wasn't already retrieved, calls {@link TemplateService.getTemplate getTemplate} to retrieve it,
   * then emits the action {@link saveTemplateAndForm} to save both the template and the form data.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Generator] Save template and form">}
   */
  public readonly retrieveTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(generateMod),
    concatLatestFrom(({minecraftVersion}) => this.store$.select(generatorFeature.selectTemplate(minecraftVersion))),
    filter(([, template]) => !template),
    switchMap(([form]) => this.templateService.getTemplate(form.minecraftVersion).pipe(
      map(template => saveTemplateAndForm({
        template,
        form
      }))
    ))
  ));

  /**
   * Intercepts the action {@link generateMod} to start the mod generation flow and,
   * if the template for the specified version was already retrieved,
   * emits the action {@link saveForm} to save the form data.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Generator] Save form">}
   */
  public readonly saveModGenerationData$ = createEffect(() => this.actions$.pipe(
    ofType(generateMod),
    concatLatestFrom(({minecraftVersion}) => this.store$.select(generatorFeature.selectTemplate(minecraftVersion))),
    filter(([, template]) => !!template),
    map(([form]) => saveForm({form}))
  ));

  /**
   * Intercepts either actions {@link saveTemplateAndForm} and {@link saveForm} to save mod generation data,
   * emits the actions:
   * - {@link incrementCallCounter} to increase the pending calls counter;
   * - {@link saveLoadingType} to update the loading type to `determinate`;
   * - {@link saveProgress} to set the progress to `0`;
   * - {@link buildMod} to start the mod building flow.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Core] Increment call counter" | "[Core] Save loading type" | "[Core] Save progress" | "[Generator] Build mod">}
   */
  public readonly updateGenerationProgress$ = createEffect(() => this.actions$.pipe(
    ofType(saveTemplateAndForm, saveForm),
    concatLatestFrom(({form}) => this.store$.select(generatorFeature.selectTemplate(form.minecraftVersion))),
    switchMap(([{form}, template]) => [
      incrementCallCounter(),
      saveLoadingType({loadingType: 'determinate'}),
      saveProgress({progress: 0}),
      buildMod({
        form,
        template: template!
      })
    ])
  ));

  /**
   * Intercepts the action {@link buildMod} to start the mod building flow,
   * emits the actions {@link download} to download the mod and {@link decrementCallCounter} to decrease the pending calls counter.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Core] Download" | "[Core] Decrement call counter">}
   */
  public readonly generateMod$ = createEffect(() => this.actions$.pipe(
    ofType(buildMod),
    switchMap(({form, template}) => observe(new JSZip().loadAsync(template).then(data => this.getTemplateProcessor(form).processTemplate(data).generateAsync({type: 'blob'}))).pipe(
      switchMap(file => [
        download({
          file,
          id: form.modIdKebab
        }),
        decrementCallCounter()
      ])
    ))
  ));

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {Store<State>} store$
   * @param {TemplateService} templateService
   * @param {LicenseService} licenseService
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>, private readonly templateService: TemplateService, private readonly licenseService: LicenseService) {}

  /**
   * Returns the appropriate {@link TemplateProcessor}.
   *
   * @private
   * @param {SkeletonForm} form
   * @returns {TemplateProcessor}
   */
  private getTemplateProcessor(form: SkeletonForm): TemplateProcessor {
    const parameters: [Store<State>, string, SkeletonForm] = [this.store$, this.licenseService.getLicense(form.license), form];
    return +form.minecraftVersion.split('.')[1]! >= this.newProcessorVersion ? new TemplateProcessorNew(...parameters) : new TemplateProcessorOld(...parameters);
  }
}
