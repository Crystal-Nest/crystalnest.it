/**
 * Supported mod loaders.
 *
 * @export
 * @typedef {ModLoader}
 */
export type ModLoader = 'Fabric' | 'Forge' | 'NeoForge';

/**
 * All supported mod loaders.
 *
 * @type {Record<Lowercase<ModLoader>, ModLoader>}
 */
export const MOD_LOADERS: Record<Lowercase<ModLoader>, ModLoader> = {
  fabric: 'Fabric',
  forge: 'Forge',
  neoforge: 'NeoForge'
};

/**
 * Formats the given loader with proper capitalization.
 *
 * @export
 * @param {Lowercase<ModLoader>} loader
 * @returns {ModLoader}
 */
export function formatLoader(loader: Lowercase<ModLoader>): ModLoader {
  return MOD_LOADERS[loader];
}
