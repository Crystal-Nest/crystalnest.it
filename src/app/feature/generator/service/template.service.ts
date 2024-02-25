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
    return this.http.post(
      '/workers/github-repo-archive',
      {
        user: TEMPLATE_GITHUB_USER,
        repo: TEMPLATE_MOD_ID_KEBAB,
        branch: minecraftVersion
      },
      {responseType: 'arraybuffer'}
    );
  }
}
