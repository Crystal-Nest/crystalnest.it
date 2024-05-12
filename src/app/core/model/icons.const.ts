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
 * Icon format.
 *
 * @typedef {IconFormat}
 */
type IconFormat = 'png' | 'gif';

/**
 * Returns an object to register the specified icon.
 *
 * @template {string} T
 * @template {IconFormat} F
 * @param {T} name
 * @param {F} format
 * @returns {Record<T, `${string}/${T}/${T}128.${F}`>}
 */
function registerBitmapIcon<T extends string, F extends IconFormat>(name: T, format: F) {
  return {
    [name]: `https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/${name}/${name}${IconSize.L}.${format}`
  } as Record<T, `${string}/${T}/${T}128.${F}`>;
}

/**
 * Returns an object to register the specified PNG icon.
 *
 * @template {string} T
 * @param {T} name
 * @returns {Record<T, `${string}/${T}/${T}128.png`>}
 */
function registerPngIcon<T extends string>(name: T) {
  return registerBitmapIcon(name, 'png');
}

/**
 * Returns an object to register the specified GIF icon.
 *
 * @template {string} T
 * @param {T} name
 * @returns {Record<T, `${string}/${T}/${T}128.gif`>}
 */
function registerGifIcon<T extends string>(name: T) {
  return registerBitmapIcon(name, 'gif');
}

/**
 * Crystal Nest icons.
 */
const ICONS = {
  platformIcon: {
    ...registerPngIcon('github'),
    ...registerPngIcon('modrinth'),
    ...registerPngIcon('curseforge'),
    ...registerPngIcon('patreon'),
    ...registerPngIcon('kofi'),
    ...registerPngIcon('discord'),
    ...registerPngIcon('crystal-nest')
  },
  modIcon: {
    ...registerPngIcon('cobweb-mod-template'),
    ...registerGifIcon('harvest-with-ease'),
    ...registerGifIcon('soul-fire-d'),
    ...registerGifIcon('leathered-boots'),
    ...registerGifIcon('torch-hit'),
    ...registerPngIcon('nightworld'),
    ...registerPngIcon('fabric-polyfill')
  }
} as const;

/**
 * Valid icon names.
 *
 * @typedef {IconName}
 */
type IconName = keyof (typeof ICONS['modIcon'] & typeof ICONS['platformIcon']);

export {ICONS, IconSize, IconName};
