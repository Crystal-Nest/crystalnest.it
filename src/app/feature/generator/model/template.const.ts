import {Platform} from './platform.type';
import {ModLoader} from '../../../core/model/mod-loader.type';

/**
 * Template java group.
 *
 * @type {"it.crystalnest"}
 */
export const TEMPLATE_GROUP = 'it.crystalnest';
/**
 * Template java group as file path.
 *
 * @type {"it/crystalnest"}
 */
export const TEMPLATE_GROUP_PATH = 'it/crystalnest';
/**
 * Template list of authors.
 *
 * @type {string[]}
 */
export const TEMPLATE_AUTHORS = ['Crystal Spider', 'Moonstone Webber', 'Noir'];
/**
 * Template mod ID.
 *
 * @type {"cobweb_mod_template"}
 */
export const TEMPLATE_MOD_ID = 'cobweb_mod_template';
/**
 * Template mod ID in kebab format.
 *
 * @type {"cobweb-mod-template"}
 */
export const TEMPLATE_MOD_ID_KEBAB = 'cobweb-mod-template';
/**
 * Template mod title.
 *
 * @type {"Cobweb Mod Template"}
 */
export const TEMPLATE_MOD_TITLE = 'Cobweb Mod Template';
/**
 * Template github owner.
 *
 * @type {"crystal-nest"}
 */
export const TEMPLATE_GITHUB_USER = 'crystal-nest';
/**
 * Template readme banner link.
 *
 * @type {`https://raw.githubusercontent.com/${typeof TEMPLATE_GITHUB_USER}/mod-fancy-assets/main/${typeof TEMPLATE_MOD_ID}/banner.png`}
 */
export const TEMPLATE_BANNER_LINK = `https://raw.githubusercontent.com/${TEMPLATE_GITHUB_USER}/mod-fancy-assets/main/${TEMPLATE_MOD_ID}/banner.png`;
/**
 * Template readme support section.
 *
 * @type {RegExp}
 */
export const TEMPLATE_SUPPORT_SECTION = /\*\*Support us\*\*(.|\n)*/;
/**
 * Template supported mod loaders.
 *
 * @type {Lowercase<ModLoader>[]}
 */
export const TEMPLATE_LOADERS: Lowercase<ModLoader>[] = ['fabric', 'forge', 'neoforge'];
/**
 * Template supported publishing platforms.
 *
 * @type {Lowercase<Platform>[]}
 */
export const TEMPLATE_PLATFORMS: Lowercase<Platform>[] = [
  'maven',
  'github',
  'modrinth',
  'curseforge'
];
