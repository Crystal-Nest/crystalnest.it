import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {ModsQuery} from '../model/mods-query.interface';

/**
 * Handles HTTP calls regarding the list of public mods.
 *
 * @export
 * @class ModsService
 * @typedef {ModsService}
 */
@Injectable()
export class ModsService {
  /**
   * @constructor
   * @public
   * @param {HttpClient} http
   */
  public constructor(private readonly http: HttpClient) {}

  /**
   * Returns the GitHub GraphQL query result to retireve Crystal Nest repositories data.
   *
   * @public
   * @returns {Observable<ModsQuery>}
   */
  public getMods() {
    return this.http.get<ModsQuery>(
      '/api/workers/github-fetch-mods',
      {responseType: 'json'}
    );
  }
}
