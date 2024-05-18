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
}
