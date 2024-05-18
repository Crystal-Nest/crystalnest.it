import {MinecraftVersion} from '../../../core/model/minecraft-version.type';

/**
 * Commit data.
 *
 * @interface Commit
 * @typedef {Commit}
 */
interface Commit {
  /**
   * SHA signature.
   *
   * @type {string}
   */
  sha: string;
  /**
   * URL.
   *
   * @type {string}
   */
  url: string;
}

/**
 * GitHub branch data for Cobweb Mod Template repository.
 *
 * @export
 * @interface Branch
 * @typedef {Branch}
 */
export interface Branch {
  /**
   * Latest commit for the branch.
   *
   * @type {Commit}
   */
  commit: Commit;
  /**
   * Branch name.
   *
   * @type {MinecraftVersion}
   */
  name: MinecraftVersion;
  /**
   * Whether the branch is protected.
   *
   * @type {boolean}
   */
  protected: boolean;
}
