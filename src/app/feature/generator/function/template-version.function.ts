import {Branch} from '../model/branch.interface';
import {MODERN_TEMPLATE_MAJOR} from '../model/template.const';

import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {compareMinecraftVersions} from '~cn/shared/function/minecraft-version.function';

/**
 * Identifies the configuration-free template family introduced in Minecraft 26.
 *
 * @param {MinecraftVersion} version selected Minecraft branch.
 * @returns {boolean} whether to use the 26.x specialization.
 */
export function uses26Template(version: MinecraftVersion): boolean {
  return +version.split('.')[0]! >= MODERN_TEMPLATE_MAJOR;
}

/**
 * Builds options from existing Minecraft branches in descending version order.
 *
 * @param {Branch[]} branches available repository branches.
 * @returns {Record<MinecraftVersion, MinecraftVersion>} ordered branch names used as both keys and labels.
 */
export function templateVersionOptions(branches: Branch[]): Record<MinecraftVersion, MinecraftVersion> {
  return Object.fromEntries(branches.filter(branch => /^\d+\.\d+(?:\.\d+)?$/.test(branch.name)).sort((left, right) => compareMinecraftVersions(left.name, right.name)).map(branch => [branch.name, branch.name]));
}
