import {Injectable} from '@angular/core';

import {MinecraftVersion} from '../../../core/model/minecraft-version.type';
import {Branch} from '../model/branch.interface';
import {TEMPLATE_GITHUB_USER, TEMPLATE_MOD_ID_KEBAB} from '../model/template.const';

import {Service} from '~cn/core/service/service.service';

/**
 * Handles HTTP calls regarding the mod template.
 *
 * @export
 * @class TemplateService
 * @typedef {TemplateService}
 * @extends {Service}
 */
@Injectable()
export class TemplateService extends Service {
  /**
   * Retrieves the Minecraft versions available for the template.
   *
   * @public
   * @returns {Observable<Record<MinecraftVersion, MinecraftVersion>>}
   */
  public getMinecraftVersions() {
    return this.get<Branch[]>(
      'https://api.github.com/repos/crystal-nest/cobweb-mod-template/branches',
      {headers: {'X-GitHub-Api-Version': '2022-11-28'} }
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
    return this.post(
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
