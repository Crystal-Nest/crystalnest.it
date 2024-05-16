import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, filter, forkJoin, map, of, switchMap} from 'rxjs';

import {Readme, Release, Repository} from '../model/github.const';

import {GITHUB_HEADERS} from '~cn/core/model/github.const';

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
   * @param {number} perPage
   * @param {number} page
   * @returns {Observable<Repository[]>}
   */
  public getMods(perPage: number, page: number) {
    return this.http.get<Repository[]>(
      `https://api.github.com/orgs/crystal-nest/repos?type=public&per_page=${perPage}&page=${page}`,
      {
        headers: GITHUB_HEADERS,
        responseType: 'json'
      }
    ).pipe(
      map(repositories => repositories.filter(repository => repository.topics.includes('minecraft-mod'))),
      switchMap(repositories => forkJoin(
        repositories.map(repository => forkJoin([this.getLatestStableRelease(repository.name), this.getLatestPreviewRelease(repository.name), this.getDescription(repository.name)]).pipe(
          filter(([stable, preview]) => !!(stable || preview)),
          map(([stable, preview, description]) => ({
            ...repository,
            subtitle: repository.description,
            stable,
            preview,
            description
          }))
        ))
      ))
    );
  }

  public getLatestStableRelease(repository: string) {
    return this.http.get<Release>(
      `https://api.github.com/repos/crystal-nest/${repository}/releases/latest`,
      {
        headers: GITHUB_HEADERS,
        responseType: 'json'
      }
    ).pipe(
      map(release => release.name.split('-')[1]!),
      catchError(() => of(null))
    );
  }

  public getLatestPreviewRelease(repository: string) {
    return this.http.get<Release[]>(
      `https://api.github.com/repos/crystal-nest/${repository}/releases?per_page=1`,
      {
        headers: GITHUB_HEADERS,
        responseType: 'json'
      }
    ).pipe(
      map(releases => releases.find(release => release.prerelease)?.name.split('-').filter((_, index) => index > 0).join('-') ?? null),
      catchError(() => of(null))
    );
  }

  public getDescription(repository: string) {
    return this.http.get<Readme>(
      `https://api.github.com/repos/crystal-nest/${repository}/readme`,
      {
        headers: GITHUB_HEADERS,
        responseType: 'json'
      }
    ).pipe(
      // https://www.npmjs.com/package/ngx-markdown
      map(readme => atob(readme.content).match(/Description\*\*\n*((.*\n)*?)##/)?.[1]?.trim().replace(/\[(.*)\]\(.*\)/g, '$1') || 'Surely an awesome mod, but the description is missing!')
    );
  }
}
