import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';

import {Branch} from '../model/branch.interface';
import {MinecraftVersion} from '../model/minecraft-version.type';
import {TEMPLATE_GITHUB_USER, TEMPLATE_MOD_ID_KEBAB} from '../model/template.const';

import {GITHUB_HEADERS} from '~cn/core/model/github.const';

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
   * Retrieves the Minecraft versions available for the template.
   *
   * @public
   * @returns {Observable<Record<MinecraftVersion, MinecraftVersion>>}
   */
  public getMinecraftVersions() {
    return this.http.get<Branch[]>(
      'https://api.github.com/repos/crystal-nest/cobweb-mod-template/branches',
      {
        headers: GITHUB_HEADERS,
        responseType: 'json'
      }
    ).pipe(
      map(response => response.reverse().reduce((prev, curr) => ({
        ...prev,
        [curr.name]: curr.name
      }), {} as Record<MinecraftVersion, MinecraftVersion>))
    );
  }

  /**
   * Retrieves the `template.zip` asset.
   *
   * @public
   * @param {MinecraftVersion} minecraftVersion
   * @returns {Observable<ArrayBuffer>}
   */
  public getTemplate(minecraftVersion: MinecraftVersion) {
    return this.http.post(
      '/api/workers/github-repo-archive',
      {
        user: TEMPLATE_GITHUB_USER,
        repo: TEMPLATE_MOD_ID_KEBAB,
        branch: minecraftVersion
      },
      {responseType: 'arraybuffer'}
    );
  }
}
