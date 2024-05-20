import {Injectable} from '@angular/core';

import {ModsQuery} from '../model/mods-query.interface';

import {Service} from '~cn/core/service/service.service';

/**
 * Handles HTTP calls regarding the list of public mods.
 *
 * @export
 * @class ModsService
 * @typedef {ModsService}
 * @extends {Service}
 */
@Injectable()
export class ModsService extends Service {
  /**
   * Returns the GitHub GraphQL query result to retireve Crystal Nest repositories data.
   *
   * @public
   * @returns {Observable<ModsQuery>}
   */
  public getMods() {
    return this.get<ModsQuery>('/api/workers/github-fetch-mods');
  }
}
