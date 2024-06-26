import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import {Store} from '@ngrx/store';
import JSZip, {JSZipObject} from '@progress/jszip-esm';
import {filter, map, switchMap, withLatestFrom} from 'rxjs';

import {buildMod, generateMod, retrieveTemplateMinecraftVersions, saveForm, saveTemplateAndForm, saveTemplateMinecraftVersions} from './actions';
import {State, generatorFeature} from './feature';
import {Platform} from '../model/platform.type';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from '../model/template.const';
import {TemplateService} from '../service/template.service';

import {observe} from '~cn/core/function/core.function';
import {ModLoader} from '~cn/core/model/mod-loader.type';
import {decrementCallCounter, download, incrementCallCounter, incrementProgress, saveLoadingType, saveProgress} from '~cn/core/redux/actions';

/**
 * Change to apply to a file, replacing the first value with the second one, only if the third one is true or absent.
 */
type Change = [(string | RegExp), string] | [(string | RegExp), string, boolean];

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
    switchMap(({form, template}) => observe(new JSZip().loadAsync(template).then(data => this.processTemplate(data, form).generateAsync({type: 'blob'}))).pipe(
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
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>, private readonly templateService: TemplateService) {}

  /**
   * Processes the given zip template according to the provided properties.  
   * 
   * @private
   * @param {JSZip} template
   * @param {SkeletonForm} form
   * @param {MinecraftVersion} form.minecraftVersion
   * @param {Lowercase<ModLoader>[]} form.loaders
   * @param {Lowercase<Platform>[]} form.platforms
   * @param {string} form.group
   * @param {string} form.modId
   * @param {string} form.modIdKebab
   * @param {string} form.modTitle
   * @param {string} form.authors
   * @param {string} form.description
   * @param {string} form.githubUser
   * @param {boolean} form.includeConfig
   * @param {boolean} form.crystalNestMod
   * @returns {JSZip}
   */
  private processTemplate(template: JSZip, {minecraftVersion, loaders, platforms, group, modId, modIdKebab, modTitle, authors, description, githubUser, includeConfig, crystalNestMod}: SkeletonForm): JSZip {
    const zip = new JSZip();
    // Constants.
    const othersMod = !crystalNestMod;
    const noConfig = !includeConfig;
    const root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
    const excludedLoaders = TEMPLATE_LOADERS.filter(loader => !loaders.includes(loader));
    const excludedPlatforms = TEMPLATE_PLATFORMS.filter(platform => !platforms.includes(platform));
    const increment = 100 / Object.keys(template.files).length;
    // Common changes.
    const rootChange: Change = [root, modIdKebab];
    const modIdChange: Change = [TEMPLATE_MOD_ID, modId];
    const modIdKebabChange: Change = [TEMPLATE_MOD_ID_KEBAB, modIdKebab];
    const modTitleChange: Change = [TEMPLATE_MOD_TITLE, modTitle.trim()];
    const groupChange: Change = [new RegExp(`${TEMPLATE_GROUP.replace('.', '\\.')}(?!\\.cobweb\\.)`, 'g'), group, othersMod];
    const groupPathChange: Change = [TEMPLATE_GROUP_PATH, group.replaceAll('.', '/'), othersMod];
    const fcapChange: Change = [/.*f(orge-)?c(onfig-)?a(pi-)?p(ort)?.*\n/g, '', noConfig];
    const loaderChanges = this.loadersChanges(excludedLoaders);
    // eslint-disable-next-line complexity
    template.forEach((path, entry) => {
      if (!((othersMod && path.includes('.github')) || (noConfig && path.includes('config')) || excludedLoaders.some(loader => path.startsWith(`${root}/${loader}`)))) {
        switch (true) {
          case entry.dir:
            // Directory: replace the name of the root dir, group, and modid.
            zip.folder(this.process(path, [rootChange, groupPathChange, modIdChange]));
            break;
          case path === `${root}/build.gradle`:
            // Handle build.gradle.
            zip.file(
              this.process(path, [rootChange]),
              entry.async('string').then(content => this.processBuildGradle(
                this.process(content, [[/.*sonar.*\n(.*({|})\n){0,2}\n?/gi, '', othersMod], fcapChange, [/\s*maven.*\n(.*Fuzs.*\n){2}\s*}/, '', noConfig]]),
                excludedLoaders,
                excludedPlatforms
              ))
            );
            break;
          case path === `${root}/common/build.gradle`:
            // Common build.gradle: update configuration dependency and platform publishing tasks.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [fcapChange, ...excludedPlatforms.map(platform => [new RegExp(`.*${platform}.*\\n`, 'i'), ''] as Change)])
            );
            break;
          case path === `${root}/forge/build.gradle`:
            // Forge build.gradle: update configuration dependency and platform publishing tasks.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [fcapChange, [/\n.*publishing(.*\n)*?}\n/, '', excludedPlatforms.includes('maven')]])
            );
            break;
          case path.endsWith('build.gradle'):
            // Subprojects build.gradle: update configuration dependency.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [fcapChange])
            );
            break;
          case path.endsWith('gradle.properties'):
            // File gradle.properties: replace Gradle properties.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [
                groupChange,
                [TEMPLATE_AUTHORS.join(', '), authors, othersMod],
                modTitleChange,
                modIdKebabChange,
                modIdChange,
                [/^description = .*$/m, `description = ${description.trim().replaceAll('\n', '\\n')}`],
                [TEMPLATE_GITHUB_USER, githubUser, othersMod],
                fcapChange,
                [/.*curse.*\n/, '', excludedPlatforms.includes('curseforge')],
                ...loaderChanges
              ])
            );
            break;
          case path.endsWith('README.md'):
            // File README.md: replace link references.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [
                [TEMPLATE_BANNER_LINK, 'Banner link here...', othersMod],
                [`github.com/${TEMPLATE_GITHUB_USER}`, `github.com/${githubUser}`, othersMod],
                modTitleChange,
                modIdKebabChange,
                modIdChange,
                [TEMPLATE_SUPPORT_SECTION, '**Support us**\n\nSocial links here...\n', othersMod],
                [/-.*configuration.*\n/, '', includeConfig],
                ...loaderChanges
              ])
            );
            break;
          case path.endsWith('settings.gradle'):
            // File settings.gradle: update project name and loaders.
            zip.file(this.process(path, [rootChange]), this.alter(entry, [modIdKebabChange, ...loaderChanges]));
            break;
          case path.endsWith('.jar') || path.endsWith('.png'):
            // Data files: parse them as arraybuffer rather than string.
            zip.file(this.process(path, [rootChange, modIdChange, modIdKebabChange]), entry.async('arraybuffer'));
            break;
          case path.endsWith('CommonModLoader.java'):
            // File CommonModLoader.java: replace mod properties and optionally remove configuration references.
            zip.file(
              this.process(path, [rootChange, groupPathChange, modIdChange]),
              this.alter(entry, [[/\n.*config.*\n */gi, '', noConfig], groupChange, modIdChange])
            );
            break;
          case path.endsWith('fabric.mod.json'):
            // File fabric.mod.json: optionally remove FCAP dependency and change homepage link.
            zip.file(
              this.process(path, [rootChange]),
              // eslint-disable-next-line no-template-curly-in-string
              this.alter(entry, [[/,\n.*fcap.*/, '', noConfig], [/https.*modrinth.*mod\//, platforms.includes('curseforge') ? 'www.curseforge.com/minecraft/mc-mods/' : 'github.com/${github_user}/', excludedPlatforms.includes('modrinth')]])
            );
            break;
          case path.endsWith('mods.toml'):
            // Files mods.toml: optionally remove FCAP dependency and change updateJSON link.
            zip.file(
              this.process(path, [rootChange]),
              this.alter(entry, [[/.*(\n.*){3}fcap(.*\n){3}/, '', noConfig], ['updateJSONURL', '#updateJSONURL', excludedPlatforms.includes('modrinth')]])
            );
            break;
          default:
            // All other files: replace mod properties.
            zip.file(
              this.process(path, [
                rootChange,
                groupPathChange,
                groupChange,
                modIdChange
              ]),
              this.alter(entry, [groupChange, modIdKebabChange, modIdChange])
            );
            break;
        }
      }
      this.store$.dispatch(incrementProgress({increment}));
    });
    this.store$.dispatch(saveProgress({progress: 100}));
    this.store$.dispatch(saveLoadingType({
      loadingType: 'indeterminate',
      force: true
    }));
    return this.removeEmptyDirs(zip);
  }

  /**
   * Processes the content of the root build.gradle file excluding the given loaders and platforms.
   *
   * @private
   * @param {string} content
   * @param {Lowercase<ModLoader>[]} loaders loaders to exclude.
   * @param {Lowercase<Platform>[]} platforms platforms to exclude.
   * @returns {string}
   */
  private processBuildGradle(content: string, loaders: Lowercase<ModLoader>[], platforms: Lowercase<Platform>[]): string {
    let value = content;
    if (loaders.length) {
      if (loaders.includes('fabric')) {
        value = value
          .replace(/isFabric \? remapJar : jar/, 'jar')
          .replace(/, "fabric\.mod\.json"/, '')
          .replace(/.*(isFabric|fabric-loom).*\n(\s+}\n)?/gi, '');
      }
      if (loaders.includes('forge') && loaders.includes('neoforge')) {
        value = value.replace(/, "META-INF\/mods.toml"/, '');
      }
      value = value.replace(new RegExp(`^\\s+"(${loaders.join('|')}).*\\n|(.*\\b(${loaders.join('|')})".+)+(\\n.+)+?(\\s*break)\\n?`, 'gim'), '');
    }
    if (platforms.length) {
      platforms.forEach(platform => {
        switch (platform) {
          case 'maven':
            value = value.replace(/\n  publishing(.*\n)+(\s+}){4,}\n/gi, '').replace(/.*\bpublish\b.*\n/g, '');
            break;
          case 'github':
            value = value.replace(/.*github.* {(\n.*?)+?^    }\n/gim, '').replace(/^ +github.*\n/gim, '');
            break;
          case 'modrinth':
            value = value.replace(/.*modrinth.* {(\n.*?)+?^    }\n/gim, '').replace(/.*modrinth.*\n/gi, '');
            break;
          case 'curseforge':
            value = value.replace(/.*curse.* {(\n.*?)+?^    }\n/gim, '').replace(/.*curse.*\n/gi, '');
            break;
        }
      });
      if (platforms.includes('github') && platforms.includes('modrinth') && platforms.includes('curseforge')) {
        value = value.replace(/.*publisher {(\n.*?)+?^  }\n\n/m, '').replace(/.*publishMod.*\n/, '');
      }
    }
    return value;
  }

  /**
   * Returns the {@link Change changes} needed to exclude the given loaders from files.
   *
   * @private
   * @param {Lowercase<ModLoader>[]} loaders
   * @returns {Change[]}
   */
  private loadersChanges(loaders: Lowercase<ModLoader>[]): Change[] {
    return loaders.flatMap(loader => [
      // For settings.gradle
      [new RegExp(`maven.+\\n.+"${loader}"\\n.+\\n.+\\s+`, 'i'), ''],
      [new RegExp(`include\\("${loader}"\\)\\n`, 'i'), ''],
      // For gradle.properties
      [new RegExp(`# ${loader}\\n.*\\n.*\\n\\n`, 'i'), ''],
      // For readme
      [new RegExp(`\\[!\\[${loader}.+l=${loader}\\)(!.{95})?`, 'i'), '']
    ]);
  }

  /**
   * Alters the promise content with the given changes.
   *
   * @private
   * @async
   * @param {JSZipObject} value
   * @param {Change[]} changes
   * @returns {Promise<string>}
   */
  private async alter(value: JSZipObject, changes: Change[]): Promise<string> {
    return this.process(await value.async('string'), changes);
  }

  /**
   * Applies the given changes to the value.
   *
   * @private
   * @param {string} value
   * @param {Change[]} changes
   * @returns {string}
   */
  private process(value: string, changes: Change[]): string {
    return changes.reduce((content, [search, replace, flag]) => flag ?? true ? content[typeof search === 'string' ? 'replaceAll' : 'replace'](search, replace) : content, value);
  }

  /**
   * Removes all empty directories.
   *
   * @private
   * @param {JSZip} zip
   * @returns {JSZip}
   */
  private removeEmptyDirs(zip: JSZip): JSZip {
    for (const dir of zip.filter((path, entry) => entry.dir && this.isEmptyDir(zip.files, path)).map(entry => entry.name)) {
      zip.remove(dir);
    }
    return zip;
  }

  /**
   * Checks whether the given directory is empty.
   *
   * @private
   * @param {Record<string, JSZipObject>} files
   * @param {string} dir
   * @returns {boolean}
   */
  private isEmptyDir(files: Record<string, JSZipObject>, dir: string) {
    for (const [path, entry] of Object.entries(files)) {
      if (entry.dir) {
        if (path.startsWith(dir) && path !== dir) {
          return false;
        }
      } else if (path.startsWith(dir)) {
        return false;
      }
    }
    return true;
  }
}
