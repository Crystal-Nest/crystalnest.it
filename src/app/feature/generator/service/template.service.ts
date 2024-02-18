import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {MinecraftVersion} from '../model/minecraft-version.type';
import {TEMPLATE_GITHUB_USER, TEMPLATE_MOD_ID_KEBAB} from '../model/template.constants';

/**
 * Handles HTTP calls regarding the mod template.
 *
 * @export
 * @class TemplateService
 * @typedef {TemplateService}
 */
@Injectable()
export class TemplateService {
  /**
   * @constructor
   * @public
   * @param {HttpClient} http
   */
  public constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves the `template.zip` asset.
   *
   * @public
   * @param {MinecraftVersion} minecraftVersion
   * @returns {Observable<ArrayBuffer>}
   */
  public getTemplate(minecraftVersion: MinecraftVersion) {
    // Return this.http.jsonp<ArrayBuffer>(`https://api.github.com/repos/${TEMPLATE_GITHUB_USER}/${TEMPLATE_MOD_ID_KEBAB}/zipball/${minecraftVersion}`, 'callback');
    return this.http.get(
      `https://api.github.com/repos/${TEMPLATE_GITHUB_USER}/${TEMPLATE_MOD_ID_KEBAB}/zipball/${minecraftVersion}`,
      // `https://codeload.github.com/${TEMPLATE_GITHUB_USER}/${TEMPLATE_MOD_ID_KEBAB}/legacy.zip/refs/heads/${minecraftVersion}`,
      {
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'X-GitHub-Api-Version': '2022-11-28',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Accept': 'application/vnd.github.raw+json'
        }
      }
    );
    // Return this.http.get(`https://github.com/${TEMPLATE_GITHUB_USER}/${TEMPLATE_MOD_ID_KEBAB}/archive/refs/heads/${minecraftVersion}.zip`, {responseType: 'arraybuffer'});
  }
}
