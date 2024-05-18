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
   * Returns the list of public repositories with the `minecraft-mod` topic.  
   * The list is paginated.
   *
   * @public
   * @returns {Observable<ModsQuery>}
   */
  public getMods() {
    return this.http.get<ModsQuery>(
      'https://crystalnest.it/api/workers/github-fetch-mods',
      {responseType: 'json'}
    );
  }
}
