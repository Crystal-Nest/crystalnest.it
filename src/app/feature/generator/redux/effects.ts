import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import JSZip, {JSZipObject} from '@progress/jszip-esm';
import {filter, ignoreElements, map, switchMap, tap, withLatestFrom} from 'rxjs';

import {buildMod, generateMod, retrieveTemplateMinecraftVersions, saveForm, saveTemplateAndForm, saveTemplateMinecraftVersions} from './actions';
import {State, generatorFeature} from './feature';
import {Platform} from '../model/platform.type';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from '../model/template.const';
import {TemplateService} from '../service/template.service';

import {ModLoader} from '~cn/core/model/mod-loader.type';
import {decrementCallCounter, incrementCallCounter, incrementProgress, saveLoadingType, saveProgress} from '~cn/core/redux/actions';

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
  public retrieveTemplateMinecraftVersions$ = createEffect(() => this.actions$.pipe(
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

  public retrieveTemplate$ = createEffect(() => this.actions$.pipe(
    ofType(generateMod),
    withLatestFrom(this.store$.select(generatorFeature.selectTemplate)),
    filter(([, template]) => !template),
    switchMap(([form]) => this.templateService.getTemplate(form.minecraftVersion).pipe(
      map(template => saveTemplateAndForm({
        template,
        form
      }))
    ))
  ));

  public saveModGenerationData$ = createEffect(() => this.actions$.pipe(
    ofType(generateMod),
    withLatestFrom(this.store$.select(generatorFeature.selectTemplate)),
    filter(([, template]) => !!template),
    map(([form]) => saveForm({form}))
  ));

  public updateGenerationProgress$ = createEffect(() => this.actions$.pipe(
    ofType(saveTemplateAndForm, saveForm),
    withLatestFrom(this.store$.select(generatorFeature.selectTemplate)),
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

  public generateMod$ = createEffect(() => this.actions$.pipe(
    ofType(buildMod),
    tap(({form, template}) => new JSZip().loadAsync(template).then(data => this.processTemplate(data, form).generateAsync({type: 'blob'}).then(file => this.download(file, form.modIdKebab)))),
    ignoreElements()
  ), {dispatch: false});

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
    const modTitleChange: Change = [TEMPLATE_MOD_TITLE, modTitle];
    const groupChange: Change = [TEMPLATE_GROUP, group, othersMod];
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
    return zip;
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
   * Downloads the given `file`.
   *
   * @private
   * @param {Blob} file
   * @param {string} id
   */
  private download(file: Blob, id: string) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = URL.createObjectURL(file);
    anchor.download = `cobweb-mod-skeleton (${id})`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    this.store$.dispatch(decrementCallCounter());
  }
}
