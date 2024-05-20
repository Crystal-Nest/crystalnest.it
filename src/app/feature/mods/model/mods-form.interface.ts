import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {ModLoader} from '~cn/core/model/mod-loader.type';

/**
 * Mods filter form data.
 *
 * @export
 * @interface ModsForm
 * @typedef {ModsForm}
 */
export interface ModsForm {
  /**
   * Mod name.
   *
   * @type {string}
   */
  query: string;
  /**
   * Whether to show advanced search.
   *
   * @type {boolean}
   */
  advanced: boolean;
  /**
   * Supported Minecraft versions.
   *
   * @type {MinecraftVersion[]}
   */
  versions: MinecraftVersion[];
  /**
   * Supported mod loaders.
   *
   * @type {Lowercase<ModLoader>[]}
   */
  loaders: Lowercase<ModLoader>[];
  /**
   * Whether it's required client-side.
   *
   * @type {(boolean | null)}
   */
  client: boolean | null;
  /**
   * Whether it's required server-side.
   *
   * @type {(boolean | null)}
   */
  server: boolean | null;
  /**
   * Whether it has a Wiki page.
   *
   * @type {boolean}
   */
  wiki: boolean;
  /**
   * Whether it provides an API.
   *
   * @type {boolean}
   */
  api: boolean;
  /**
   * Whether it is a template.
   *
   * @type {boolean}
   */
  template: boolean;
  /**
   * Whether it has a stable version.
   *
   * @type {boolean}
   */
  stable: boolean;
}
