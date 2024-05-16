/**
 * Valid application routes.
 *
 * @export
 * @enum {string}
 */
export enum ROUTE {
  HOME = '',
  GENERATOR = 'generator',
  VERSIONING = 'versioning',
  MODS = 'mods'
}

/**
 * Type guard for {@link ROUTE}.
 *
 * @export
 * @param {string} route
 * @returns {route is ROUTE}
 */
export function isValidRoute(route: string): route is ROUTE {
  return Object.values(ROUTE).includes(route as ROUTE);
}
