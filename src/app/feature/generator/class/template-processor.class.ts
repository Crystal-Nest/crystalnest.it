import {Store} from '@ngrx/store';
import JSZip, {JSZipObject} from '@progress/jszip-esm';

import {Change} from '../model/change.type';
import {License} from '../model/license.type';
import {Platform} from '../model/platform.type';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {LICENSES, TEMPLATE_AUTHORS, TEMPLATE_BANNER_LINK, TEMPLATE_GITHUB_USER, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from '../model/template.const';
import {State} from '../redux/feature';

import {ModLoader} from '~cn/core/model/mod-loader.type';
import {incrementProgress, saveLoadingType, saveProgress} from '~cn/core/redux/actions';

/**
 * Template processor.
 *
 * @export
 * @abstract
 * @class TemplateProcessor
 * @typedef {TemplateProcessor}
 */
export abstract class TemplateProcessor {
  /**
   * Zip file.
   *
   * @protected
   * @readonly
   * @type {JSZip}
   */
  protected readonly zip = new JSZip();

  /**
   * Mod authors.
   *
   * @protected
   * @readonly
   * @type {string}
   */
  protected readonly authors: string;

  /**
   * Mod description.
   *
   * @protected
   * @readonly
   * @type {string}
   */
  protected readonly description: string;

  /**
   * Mod GitHub owner.
   *
   * @protected
   * @readonly
   * @type {string}
   */
  protected readonly githubUser: string;

  /**
   * Whether the mod is not from Crystal Nest.
   *
   * @protected
   * @readonly
   * @type {boolean}
   */
  protected readonly othersMod: boolean;

  /**
   * Whether to not include the configuration setup.
   *
   * @protected
   * @readonly
   * @type {boolean}
   */
  protected readonly noConfig: boolean;

  /**
   * Selected publishing platforms.
   *
   * @protected
   * @readonly
   * @type {Lowercase<Platform>[]}
   */
  protected readonly platforms: Lowercase<Platform>[];

  /**
   * Template root path.
   *
   * @protected
   * @readonly
   * @type {string}
   */
  protected readonly root: string;

  /**
   * Mod loaders to exclude from the template.
   *
   * @protected
   * @readonly
   * @type {Lowercase<ModLoader>[]}
   */
  protected readonly excludedLoaders: Lowercase<ModLoader>[];

  /**
   * Publishing platforms to exclude from the template.
   *
   * @protected
   * @readonly
   * @type {Lowercase<Platform>[]}
   */
  protected readonly excludedPlatforms: Lowercase<Platform>[];

  /**
   * Change for the root.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly rootChange: Change;

  /**
   * Change for the mod ID.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly modIdChange: Change;

  /**
   * Change for the mod ID in kebab case.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly modIdKebabChange: Change;

  /**
   * Change for the mod title.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly modTitleChange: Change;

  /**
   * Change for the Jave group.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly groupChange: Change;

  /**
   * Change for the Java group in file paths.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly groupPathChange: Change;

  /**
   * Change for the configuration dependency.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly fcapChange: Change;

  /**
   * Changes for the mod loaders.
   *
   * @protected
   * @readonly
   * @type {Change[]}
   */
  protected readonly loaderChanges: Change[];

  /**
   * Chosen license.
   *
   * @protected
   * @readonly
   * @type {License}
   */
  protected readonly licenseId: License;

  /**
   * Change for the license URL when building the JARs.
   *
   * @protected
   * @readonly
   * @type {Change}
   */
  protected readonly licenseChange: Change;

  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   * @param {Store<State>} licenseText
   * @param {SkeletonForm} param0
   * @param {SkeletonForm} param0.minecraftVersion
   * @param {SkeletonForm} param0.loaders
   * @param {SkeletonForm} param0.platforms
   * @param {SkeletonForm} param0.group
   * @param {SkeletonForm} param0.modId
   * @param {SkeletonForm} param0.modIdKebab
   * @param {SkeletonForm} param0.modTitle
   * @param {SkeletonForm} param0.authors
   * @param {SkeletonForm} param0.description
   * @param {SkeletonForm} param0.githubUser
   * @param {SkeletonForm} param0.includeConfig
   * @param {SkeletonForm} param0.crystalNestMod
   */
  public constructor(
    private readonly store$: Store<State>,
    private readonly licenseText: string,
    {minecraftVersion, loaders, platforms, group, modId, modIdKebab, modTitle, authors, description, githubUser, includeConfig, crystalNestMod, license}: SkeletonForm
  ) {
    // Constants.
    this.authors = authors;
    this.description = description;
    this.githubUser = githubUser;
    this.othersMod = !crystalNestMod;
    this.noConfig = !includeConfig;
    this.platforms = platforms;
    this.licenseId = license;
    // eslint-disable-next-line no-template-curly-in-string
    this.licenseChange = ['https://spdx.org/licenses/${license}.html', 'https://github.com/Crystal-Nest/.github/blob/main/LICENSE', this.licenseId === 'CNCLv1'];
    this.root = `${TEMPLATE_MOD_ID_KEBAB}-${minecraftVersion}`;
    this.excludedLoaders = TEMPLATE_LOADERS.filter(loader => !loaders.includes(loader));
    this.excludedPlatforms = TEMPLATE_PLATFORMS.filter(platform => !platforms.includes(platform));
    // Common changes.
    this.rootChange = [this.root, modIdKebab];
    this.modIdChange = [TEMPLATE_MOD_ID, modId];
    this.modIdKebabChange = [TEMPLATE_MOD_ID_KEBAB, modIdKebab];
    this.modTitleChange = [TEMPLATE_MOD_TITLE, modTitle.trim()];
    this.groupChange = [new RegExp(`${TEMPLATE_GROUP.replace('.', '\\.')}(?!\\.cobweb\\.)`, 'g'), group, this.othersMod];
    this.groupPathChange = [TEMPLATE_GROUP_PATH, group.replaceAll('.', '/'), this.othersMod];
    this.fcapChange = [/.*f(orge-)?c(onfig-)?a(pi-)?p(ort)?.*\n/g, '', this.noConfig];
    this.loaderChanges = this.loadersChanges(this.excludedLoaders);
  }

  /**
   * Processes the given zip template according to the provided properties.  
   * 
   * @public
   * @param {JSZip} template
   * @returns {JSZip}
   */
  public processTemplate(template: JSZip): JSZip {
    const increment = 100 / Object.keys(template.files).length;
    // eslint-disable-next-line complexity
    template.forEach((path, entry) => {
      if (!((this.othersMod && path.includes('.github')) || (this.noConfig && path.includes('config')) || this.excludedLoaders.some(loader => path.startsWith(`${this.root}/${loader}`)))) {
        switch (true) {
          case entry.dir:
            // Directory: replace the name of the root dir, group, and modid.
            this.zip.folder(this.process(path, [this.rootChange, this.groupPathChange, this.modIdChange]));
            break;
          case this.handle(entry, path): break;
          case path === `${this.root}/common/build.gradle`:
            // Common build.gradle: update configuration dependency and platform publishing tasks.
            this.zip.file(
              this.process(path, [this.rootChange]),
              this.alter(entry, [this.fcapChange, ...this.excludedPlatforms.map(platform => [new RegExp(`.*publish${platform}.*\\n`, 'i'), ''] as Change)])
            );
            break;
          case path.endsWith('gradle.properties'):
            // File gradle.properties: replace Gradle properties.
            this.zip.file(
              this.process(path, [this.rootChange]),
              this.alter(entry, [
                this.groupChange,
                [TEMPLATE_AUTHORS.join(', '), this.authors, this.othersMod],
                this.modTitleChange,
                this.modIdKebabChange,
                this.modIdChange,
                [/^description = .*$/m, `description = ${this.description.trim().replaceAll('\n', '\\n')}`],
                [TEMPLATE_GITHUB_USER, this.githubUser, this.othersMod],
                this.fcapChange,
                [/.*curse.*\n/, '', this.excludedPlatforms.includes('curseforge')],
                ['GPL-3.0-or-later', this.licenseId],
                ...this.loaderChanges
              ])
            );
            break;
          case path.endsWith('README.md'):
            // File README.md: replace link references.
            this.zip.file(
              this.process(path, [this.rootChange]),
              this.alter(entry, [
                [TEMPLATE_BANNER_LINK, 'Banner link here...', this.othersMod],
                [`github.com/${TEMPLATE_GITHUB_USER}`, `github.com/${this.githubUser}`, this.othersMod],
                this.modTitleChange,
                this.modIdKebabChange,
                this.modIdChange,
                [TEMPLATE_SUPPORT_SECTION, '**Support us**\n\nSocial links here...\n', this.othersMod],
                [/-.*configuration.*\n/, '', !this.noConfig],
                ['template for any mod', 'for any modpack or video'],
                ['GNU General Public License v3.0', LICENSES[this.licenseId]],
                ...this.loaderChanges
              ])
            );
            break;
          case path.endsWith('settings.gradle'):
            // File settings.gradle: update project name and loaders.
            this.zip.file(this.process(path, [this.rootChange]), this.alter(entry, [this.modIdKebabChange, ...this.loaderChanges]));
            break;
          case path.endsWith('.jar') || path.endsWith('.png'):
            // Data files: parse them as arraybuffer rather than string.
            this.zip.file(this.process(path, [this.rootChange, this.modIdChange, this.modIdKebabChange]), entry.async('arraybuffer'));
            break;
          case path.endsWith('LICENSE'):
            this.zip.file(this.process(path, [this.rootChange, this.groupPathChange, this.modIdChange]), this.licenseText);
            break;
          case path.endsWith('CommonModLoader.java'):
            // File CommonModLoader.java: replace mod properties and optionally remove configuration references.
            this.zip.file(
              this.process(path, [this.rootChange, this.groupPathChange, this.modIdChange]),
              this.alter(entry, [[/\n.*config.*\n */gi, '', this.noConfig], this.groupChange, this.modIdChange])
            );
            break;
          case path.endsWith('fabric.mod.json'):
            // File fabric.mod.json: optionally remove FCAP dependency and change homepage link.
            this.zip.file(
              this.process(path, [this.rootChange]),
              // eslint-disable-next-line no-template-curly-in-string
              this.alter(entry, [[/,\n.*fcap.*/, '', this.noConfig], [/https.*modrinth.*mod\//, this.platforms.includes('curseforge') ? 'www.curseforge.com/minecraft/mc-mods/' : 'github.com/${github_user}/', this.excludedPlatforms.includes('modrinth')]])
            );
            break;
          case path.endsWith('mods.toml'):
            // Files mods.toml: optionally remove FCAP dependency and change updateJSON link.
            this.zip.file(
              this.process(path, [this.rootChange]),
              this.alter(entry, [[/.*(\n.*){3}fcap(.*\n){3}/, '', this.noConfig], ['updateJSONURL', '#updateJSONURL', this.excludedPlatforms.includes('modrinth')]])
            );
            break;
          default:
            // All other files: replace mod properties.
            this.zip.file(
              this.process(path, [
                this.rootChange,
                this.groupPathChange,
                this.groupChange,
                this.modIdChange
              ]),
              this.alter(entry, [this.groupChange, this.modIdKebabChange, this.modIdChange])
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
    return this.removeEmptyDirs(this.zip);
  }

  /**
   * Handle a specific case.
   *
   * @protected
   * @abstract
   * @param {JSZipObject} entry file entry.
   * @param {string} path entry path.
   * @returns {boolean} whether the entry had been handled and no further processing should be done on it.
   */
  protected abstract handle(entry: JSZipObject, path: string): boolean;

  /**
   * Processes the content of the root build.gradle file excluding the given loaders and platforms.
   *
   * @protected
   * @abstract
   * @param {string} content
   * @param {Lowercase<ModLoader>[]} loaders loaders to exclude.
   * @param {Lowercase<Platform>[]} platforms platforms to exclude.
   * @returns {string}
   */
  protected abstract processBuildGradle(content: string, loaders: Lowercase<ModLoader>[], platforms: Lowercase<Platform>[]): string;

  /**
   * Returns the {@link Change changes} needed to exclude the given loaders from files.
   *
   * @protected
   * @abstract
   * @param {Lowercase<ModLoader>[]} loaders
   * @returns {Change[]}
   */
  protected abstract loadersChanges(loaders: Lowercase<ModLoader>[]): Change[];

  /**
   * Alters the promise content with the given changes.
   *
   * @protected
   * @async
   * @param {JSZipObject} value
   * @param {Change[]} changes
   * @returns {Promise<string>}
   */
  protected async alter(value: JSZipObject, changes: Change[]): Promise<string> {
    return this.process(await value.async('string'), changes);
  }

  /**
   * Applies the given changes to the value.
   *
   * @protected
   * @param {string} value
   * @param {Change[]} changes
   * @returns {string}
   */
  protected process(value: string, changes: Change[]): string {
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
