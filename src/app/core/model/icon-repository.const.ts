/**
 * Icon size.
 *
 * @enum {number}
 */
enum IconSize {
  XS = 16,
  S = 32,
  M = 64,
  L = 128,
  XL = 256,
  XXL = 512
}

/**
 * TODO.
 *
 * @typedef {IconFormat}
 */
type IconFormat = 'png' | 'gif';

/**
 * TODO.
 *
 * @param {string} repository
 * @returns {{ registerStaticIcon: (name: string) => Readonly<Record<string, `${string}/${string}/${string}128.${string}`>>; registerAnimatedIcon: (name: string) => Readonly<Record<string, `${string}/${string}/${string}128.${string}`>>; }}
 */
function createIconRegistry(repository: string) {
  /**
   * TODO.
   *
   * @param {IconFormat} format
   * @returns {<T extends string>(name: T) => Record<T, `${string}/${T}/${T}128.png` | `${string}/${T}/${T}128.gif`>}
   */
  function registerIcon(format: IconFormat) {
    return function<T extends string>(name: T) {
      return {
        [name]: `${repository}/${name}/${name}${IconSize.L}.${format}`
      } as Record<T, `${string}/${T}/${T}128.${IconFormat}`>;
    };
  }

  return {
    registerStaticIcon: registerIcon('png'),
    registerAnimatedIcon: registerIcon('gif')
  };
}

const crystalNestIconRegistry = createIconRegistry('https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main');

const CrystalNestIcon = {
  platformIcon: {
    ...crystalNestIconRegistry.registerStaticIcon('github'),
    ...crystalNestIconRegistry.registerStaticIcon('modrinth'),
    ...crystalNestIconRegistry.registerStaticIcon('curseforge'),
    ...crystalNestIconRegistry.registerStaticIcon('patreon'),
    ...crystalNestIconRegistry.registerStaticIcon('kofi'),
    ...crystalNestIconRegistry.registerStaticIcon('discord')
  },
  modIcon: {
    ...crystalNestIconRegistry.registerStaticIcon('cobweb-mod-template'),
    ...crystalNestIconRegistry.registerAnimatedIcon('harvest-with-ease'),
    ...crystalNestIconRegistry.registerAnimatedIcon('soul-fire-d'),
    ...crystalNestIconRegistry.registerAnimatedIcon('leathered-boots'),
    ...crystalNestIconRegistry.registerAnimatedIcon('torch-hit'),
    ...crystalNestIconRegistry.registerStaticIcon('nightworld'),
    ...crystalNestIconRegistry.registerStaticIcon('fabric-polyfill')
  }
} as const;

export {CrystalNestIcon, IconSize};
