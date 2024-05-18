import {Platform} from './platform.type';
import {MinecraftVersion} from '../../../core/model/minecraft-version.type';
import {ModLoader} from '../../../core/model/mod-loader.type';

/**
 * Skeleton Generator form data.
 *
 * @export
 * @interface SkeletonFormData
 * @typedef {SkeletonForm}
 */
export interface SkeletonForm {
  /**
   * Available Minecraft versions.
   *
   * @type {MinecraftVersion}
   */
  minecraftVersion: MinecraftVersion;
  /**
   * Java group.
   *
   * @type {string}
   */
  group: string;
  /**
   * Mod authors.
   *
   * @type {string}
   */
  authors: string;
  /**
   * Mod title.
   *
   * @type {string}
   */
  modTitle: string;
  /**
   * Mod ID.
   *
   * @type {string}
   */
  modId: string;
  /**
   * Mod ID in kebab-case.
   *
   * @type {string}
   */
  modIdKebab: string;
  /**
   * Which mod loaders to setup.
   *
   * @type {Lowercase<ModLoader>[]}
   */
  loaders: Lowercase<ModLoader>[];
  /**
   * Which platforms to setup.
   *
   * @type {Lowercase<Platform>[]}
   */
  platforms: Lowercase<Platform>[];
  /**
   * GitHub user owning the repository.
   *
   * @type {string}
   */
  githubUser: string;
  /**
   * Mod description.
   *
   * @type {string}
   */
  description: string;
  /**
   * Whether it's a mod of the Crystal Nest.
   *
   * @type {boolean}
   */
  crystalNestMod: boolean;
  /**
   * Whether to auto-generate {@link modId} and {@link modIdKebab} according to {@link modTitle}.
   *
   * @type {boolean}
   */
  autogenModId: boolean;
  /**
   * Whether to include configuration specific stuff.
   *
   * @type {boolean}
   */
  includeConfig: boolean;
}
