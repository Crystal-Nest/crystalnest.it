import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {ModLoader} from '~cn/core/model/mod-loader.type';
import {ModVersion} from '~cn/core/model/mod-version.type';

/**
 * Mod.
 *
 * @export
 * @interface Mod
 * @typedef {Mod}
 */
export interface Mod {
  /**
   * Name.
   *
   * @type {string}
   */
  name: string;
  /**
   * Title.
   *
   * @type {string}
   */
  title: string;
  /**
   * Subtitle.
   *
   * @type {string}
   */
  subtitle: string;
  /**
   * Readme description section.
   *
   * @type {string}
   */
  description: string;
  /**
   * Whether it has a Wiki page.
   *
   * @type {boolean}
   */
  hasWiki: boolean;
  /**
   * Whether it provides an API.
   *
   * @type {boolean}
   */
  isApi: boolean;
  /**
   * Whether it is a template.
   *
   * @type {boolean}
   */
  isTemplate: boolean;
  /**
   * Latest stable release.
   *
   * @type {ModVersion | null}
   */
  stable: ModVersion | null;
  /**
   * Latest release.
   *
   * @type {ModVersion | null}
   */
  latest: ModVersion | null;
  /**
   * Supported mod loaders.
   *
   * @type {Lowercase<ModLoader>[]}
   */
  loaders: Lowercase<ModLoader>[];
  /**
   * Supported Minecraft versions.
   *
   * @type {MinecraftVersion[]}
   */
  versions: MinecraftVersion[];
  /**
   * Whether it is required client-side.
   *
   * @type {boolean}
   */
  client: boolean;
  /**
   * Whether it is required server-side.
   *
   * @type {boolean}
   */
  server: boolean;
}
