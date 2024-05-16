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
