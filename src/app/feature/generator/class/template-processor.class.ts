import {Store} from '@ngrx/store';
import JSZip, {JSZipObject} from '@progress/jszip-esm';

import {Change} from '../model/change.type';
import {License} from '../model/license.type';
import {Platform} from '../model/platform.type';
import {SkeletonForm} from '../model/skeleton-form.interface';
import {LICENSES, TEMPLATE_BANNER_LINK, TEMPLATE_GROUP, TEMPLATE_GROUP_PATH, TEMPLATE_LOADERS, TEMPLATE_MOD_ID, TEMPLATE_MOD_ID_KEBAB, TEMPLATE_MOD_TITLE, TEMPLATE_PLATFORMS, TEMPLATE_SUPPORT_SECTION} from '../model/template.const';
import {State} from '../redux/feature';

import {ModLoader} from '~cn/core/model/mod-loader.type';
import {incrementProgress, saveLoadingType, saveProgress} from '~cn/core/redux/actions';

/**
 * Radix used by Java-properties Unicode escape digits.
 */
const HEXADECIMAL_RADIX = 16;

/**
 * Number of hexadecimal digits representing one UTF-16 code unit in a property escape.
 */
const UNICODE_ESCAPE_WIDTH = 4;

/**
 * Processes archive content shared by every template family.
 */
export abstract class TemplateProcessor {
  /**
   * Generated project archive.
   */
  protected readonly zip = new JSZip();

  /**
   * Author list supplied by the form.
   */
  protected readonly authors: string;

  /**
   * Project description supplied by the form.
   */
  protected readonly description: string;

  /**
   * GitHub owner of the generated project.
   */
  protected readonly githubUser: string;

  /**
   * Whether Crystal Nest-specific defaults must be replaced.
   */
  protected readonly othersMod: boolean;

  /**
   * Selected publishing destinations.
   */
  protected readonly platforms: Lowercase<Platform>[];

  /**
   * Source archive root derived from the selected Minecraft branch.
   */
  protected readonly root: string;

  /**
   * Loaders omitted from the generated project.
   */
  protected readonly excludedLoaders: Lowercase<ModLoader>[];

  /**
   * Publishing destinations omitted from the generated project.
   */
  protected readonly excludedPlatforms: Lowercase<Platform>[];

  /**
   * Replacement of the template's Java mod ID.
   */
  protected readonly modIdChange: Change;

  /**
   * Replacement of the template's project slug.
   */
  protected readonly modIdKebabChange: Change;

  /**
   * Replacement of the template's display name.
   */
  protected readonly modTitleChange: Change;

  /**
   * Replacement of the project's Java group, preserving dependency namespaces.
   */
  protected readonly groupChange: Change;

  /**
   * Replacement of the project's group in source paths.
   */
  protected readonly groupPathChange: Change;

  /**
   * Chosen project license.
   */
  protected readonly licenseId: License;

  /**
   * Replacement of the SPDX link for the custom Crystal Nest license.
   */
  protected readonly licenseChange: Change;

  /**
   * Replacement of the archive root with the generated project folder.
   */
  protected readonly rootChange: Change;

  /**
   * @constructor
   * @param {Store<State>} store$ progress dispatcher.
   * @param {string} licenseText selected license text.
   * @param {SkeletonForm} form project settings.
   */
  public constructor(private readonly store$: Store<State>, private readonly licenseText: string, protected readonly form: SkeletonForm) {
    this.authors = form.authors;
    this.description = form.description;
    this.githubUser = form.githubUser;
    this.othersMod = !form.crystalNestMod;
    this.platforms = form.platforms;
    this.licenseId = form.license;
    this.root = `${TEMPLATE_MOD_ID_KEBAB}-${form.minecraftVersion}`;
    this.rootChange = [this.root, form.modIdKebab];
    this.excludedLoaders = TEMPLATE_LOADERS.filter(loader => !form.loaders.includes(loader));
    this.excludedPlatforms = TEMPLATE_PLATFORMS.filter(platform => !form.platforms.includes(platform));
    this.modIdChange = [TEMPLATE_MOD_ID, form.modId];
    this.modIdKebabChange = [TEMPLATE_MOD_ID_KEBAB, form.modIdKebab];
    this.modTitleChange = [TEMPLATE_MOD_TITLE, form.modTitle.trim()];
    this.groupChange = [new RegExp(`${TEMPLATE_GROUP.replaceAll('.', '\\.')}(?=\\.${TEMPLATE_MOD_ID}\\b)`, 'g'), form.group, this.othersMod];
    this.groupPathChange = [`${TEMPLATE_GROUP_PATH}/${TEMPLATE_MOD_ID}`, `${form.group.replaceAll('.', '/')}/${TEMPLATE_MOD_ID}`, this.othersMod];
    // eslint-disable-next-line no-template-curly-in-string
    this.licenseChange = ['https://spdx.org/licenses/${license}.html', 'https://github.com/Crystal-Nest/.github/blob/main/LICENSE', this.licenseId === 'CNCLv1'];
  }

  /**
   * Generates a project while delegating family-specific files to the specialization.
   *
   * @param {JSZip} template source project archive.
   * @returns {JSZip} generated archive with asynchronous entry contents.
   */
  public processTemplate(template: JSZip): JSZip {
    const paths = Object.keys(template.files);
    const increment = 100 / paths.length;
    template.forEach((path, entry) => {
      if (this.includeFile(path)) {
        this.processEntry(path, entry);
      }
      this.store$.dispatch(incrementProgress({increment}));
    });
    this.store$.dispatch(saveProgress({progress: 100}));
    this.store$.dispatch(saveLoadingType({loadingType: 'indeterminate',
      force: true}));
    for (const directory of this.zip.filter((_path, entry) => entry.dir).map(entry => entry.name).sort((a, b) => b.length - a.length)) {
      if (!this.zip.filter((path, entry) => !entry.dir && path.startsWith(directory)).length) {
        this.zip.remove(directory);
      }
    }
    return this.zip;
  }

  /**
   * Determines whether the entry belongs to a retained project component.
   *
   * @param {string} path source entry path.
   * @returns {boolean} whether to include the entry.
   */
  protected includeFile(path: string): boolean {
    const relative = path.slice(this.root.length + 1);
    return !(this.othersMod && relative.startsWith('.github/')) && !this.excludedLoaders.some(loader => relative === loader || relative.startsWith(`${loader}/`));
  }

  /**
   * Writes a file when the specialization owns its format.
   *
   * @param {JSZipObject} entry source entry.
   * @param {string} path source path.
   * @returns {boolean} whether the entry was handled.
   */
  protected abstract handle(entry: JSZipObject, path: string): boolean;

  /**
   * Writes UTF-8 text, including promised content that the ZIP library otherwise treats as binary.
   *
   * @param {string} path generated entry path.
   * @param {string | Promise<string>} content generated text.
   */
  protected writeText(path: string, content: string | Promise<string>): void {
    this.zip.file(path, content, {binary: false});
  }

  /**
   * Reads normalized text and applies literal replacements.
   *
   * @param {JSZipObject} entry source entry.
   * @param {Change[]} changes requested replacements.
   * @returns {Promise<string>} transformed text.
   */
  protected async alter(entry: JSZipObject, ...changes: Change[]): Promise<string> {
    return this.process(await entry.async('string'), ...changes);
  }

  /**
   * Applies replacements without interpreting dollar signs in supplied values.
   *
   * @param {string} value source text.
   * @param {Change[]} changes requested replacements.
   * @returns {string} transformed text.
   */
  protected process(value: string, ...changes: Change[]): string {
    return changes.reduce((text, [search, replacement, enabled]) => {
      if (enabled ?? true) {
        return typeof search === 'string' ? text.replaceAll(search, () => replacement) : text.replace(search, () => replacement);
      }
      return text;
    }, value.replaceAll('\r\n', '\n'));
  }

  /**
   * Updates project properties while leaving dependency coordinates untouched.
   *
   * @param {string} text project properties.
   * @returns {string} updated properties.
   */
  protected processProperties(text: string): string {
    const values: [string, string][] = [
      ['mod_title', this.form.modTitle.trim()],
      ['mod_id', this.form.modId],
      ['mod_id_kebab', this.form.modIdKebab],
      ['description', this.description.trim()],
      ['license', this.licenseId]
    ];
    if (this.othersMod) {
      values.push(['group', this.form.group], ['mod_authors', this.authors], ['github_user', this.githubUser]);
    }
    return this.process(text, ...values.map(([key, value]): Change => [new RegExp(`^${key}\\s*=.*$`, 'm'), `${key} = ${this.escapeProperty(value)}`]));
  }

  /**
   * Updates README branding and removes setup instructions already completed or excluded by generation.
   *
   * @param {string} text template README.
   * @returns {string} README retaining the template prose with the shared project substitutions and setup cleanup.
   */
  protected processReadme(text: string): string {
    let value = this.process(text, ...this.readmeChanges());
    value = value.replace(/^- Replace the template mod ID,.*\n/m, '');
    if (this.othersMod) {
      value = value.replace(/^!\[.*\]\(Banner link here\.\.\..*\)\n/, '<!-- Add your project banner here. -->\n');
      value = value.replace(/\[Support us\]\(#[^)]*\)/, '[Support us](#support-us)');
    }
    if (!this.platforms.includes('curseforge')) {
      value = value.replace(/^- Add your project CurseForge ID.*\n/m, '');
    }
    return value;
  }

  /**
   * Supplies README replacements shared by the template families.
   *
   * @returns {Change[]} project branding and license replacements.
   */
  protected readmeChanges(): Change[] {
    return [
      [TEMPLATE_BANNER_LINK, 'Banner link here...', this.othersMod],
      ['github.com/crystal-nest', `github.com/${this.githubUser}`, this.othersMod],
      ['github.com/Crystal-Nest', `github.com/${this.githubUser}`, this.othersMod],
      this.modTitleChange,
      this.modIdKebabChange,
      this.modIdChange,
      [TEMPLATE_SUPPORT_SECTION, '## **Support us**\n\nSocial links here...\n', this.othersMod],
      ['template for any mod', 'for any modpack or video'],
      ['GNU General Public License v3.0', LICENSES[this.licenseId]]
    ];
  }

  /**
   * Selects an absolute homepage from the retained publishing destinations.
   *
   * @returns {string} homepage containing Gradle expansion placeholders.
   */
  protected homepage(): string {
    // eslint-disable-next-line no-template-curly-in-string
    const slug = '${mod_id_kebab}';
    if (this.platforms.includes('modrinth')) {
      return `https://modrinth.com/mod/${slug}`;
    }
    if (this.platforms.includes('curseforge')) {
      return `https://www.curseforge.com/minecraft/mc-mods/${slug}`;
    }
    return `https://github.com/\${github_user}/${slug}`;
  }

  /**
   * Escapes a value for a single Java-properties entry, including Unicode for the native ISO-8859-1 reader.
   *
   * @param {string} value supplied value.
   * @returns {string} escaped property value.
   */
  private escapeProperty(value: string): string {
    return value
      .replaceAll('\\', '\\\\')
      .replaceAll('\r', '\\r')
      .replaceAll('\n', '\\n')
      .replaceAll('\t', '\\t')
      .replaceAll(/[^\x20-\x7e]/g, character => `\\u${character.charCodeAt(0).toString(HEXADECIMAL_RADIX).padStart(UNICODE_ESCAPE_WIDTH, '0')}`);
  }

  /**
   * Writes generic entries and delegates textual formats.
   *
   * @param {string} path source path.
   * @param {JSZipObject} entry source entry.
   */
  private processEntry(path: string, entry: JSZipObject): void {
    const output = this.process(path, this.rootChange, this.groupPathChange, this.groupChange, this.modIdChange, this.modIdKebabChange);
    if (entry.dir) {
      this.zip.folder(output);
    } else if (/\.(?:jar|png|jpg|jpeg|gif|webp|ico|zip)$/i.test(path) || /\/gradlew(?:\.bat)?$/.test(path)) {
      this.zip.file(output, entry.async('uint8array'), {date: entry.date,
        unixPermissions: entry.unixPermissions});
    } else if (path === `${this.root}/LICENSE`) {
      this.writeText(output, this.licenseText);
    } else if (!this.handle(entry, path)) {
      this.writeText(output, this.alter(entry, this.groupChange, this.modIdKebabChange, this.modIdChange));
    }
  }
}
