import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import Fuse from 'fuse.js';
import {filter, map, switchMap, withLatestFrom} from 'rxjs';

import {filterMods, retrieveMods, saveFilteredMods, saveMods} from './actions';
import {State, modsFeature} from './feature';
import {Mod} from '../model/mod.interface';
import {ModsForm} from '../model/mods-form.interface';
import {ModsService} from '../service/mods.service';

import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {ModLoader} from '~cn/core/model/mod-loader.type';
import {ModVersion} from '~cn/core/model/mod-version.type';

/**
 * Mods effects.
 *
 * @export
 * @class ModsEffects
 * @typedef {ModsEffects}
 */
@Injectable()
export class ModsEffects {
  /**
   * List of topics related to each mod loader.
   *
   * @private
   * @readonly
   * @type {string[]}
   */
  private readonly loaderTopics = ['fabric', 'forge', 'neoforge'].map(loader => `minecraft-${loader}-mod`);

  /**
   * Intercepts the action {@link retrieveMods} to retrieve the list of mods and,
   * if mods weren't retireved already, calls {@link ModsService.getMods getMods} to retrieve the GitHub GraphQL query result for Crystal Nest mods,
   * then emits the action {@link saveMods} to save the list of mods resulted from parsing the query result.
   *
   * @public
   * @readonly
   * @type {TypedAction<"[Mods] Save mods">}
   */
  public readonly retrieveMods$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveMods),
    withLatestFrom(this.store$.select(modsFeature.selectMods)),
    filter(([, mods]) => !mods),
    switchMap(() => this.modsService.getMods().pipe(
      map(response => saveMods({
        mods: response.data.organization.repositories.nodes.filter(repository => repository.isTemplate || (repository.releases.totalCount && repository.repositoryTopics.nodes.some(topic => topic.topic.name === 'minecraft-mod'))).map(repository => ({
          name: repository.name,
          title: repository.object.text.match(/!\[(.*) banner\]/)?.[1] || repository.name,
          subtitle: repository.description,
          description: repository.object.text.match(/Description\*\*\n*((.*\n)*?)##/)?.[1]?.trim() || 'Surely an awesome mod, but the description is missing!',
          hasWiki: repository.hasWikiEnabled,
          isApi: repository.repositoryTopics.nodes.some(topic => topic.topic.name === 'mod-api'),
          isTemplate: repository.isTemplate,
          stable: repository.latestRelease?.name.split('-')[1] as ModVersion || null,
          latest: repository.releases.nodes[0]?.name.split('-').filter((_, index) => index > 0).join('-') as ModVersion || null,
          loaders: repository.repositoryTopics.nodes.filter(topic => this.loaderTopics.includes(topic.topic.name)).map(topic => topic.topic.name.split('-')[1]) as Lowercase<ModLoader>[],
          versions: repository.object.text.match(/\[!\[1\.[0-9]+\.[0-9]+\]\(.*?\)\]\(.*?\)/g)?.map(match => match.match(/(1\.[0-9]+\.[0-9]+)/)).map(value => value?.[0]) as MinecraftVersion[],
          client: this.checkSide(repository.object.text, 'client'),
          server: this.checkSide(repository.object.text, 'server')
        }))
      }))
    ))
  ));

  /**
   * Intercepts the action {@link filteredMods} to filter the list of mods,
   * emits the action {@link saveFilteredMods} to save the filtered list of mods.
   *
   * @public
   * @readonly
   * @type {Observable<TypedAction<"[Mods] Save filtered mods">>}
   */
  public readonly filterMods$ = createEffect(() => this.actions$.pipe(
    ofType(filterMods),
    withLatestFrom(this.store$.select(modsFeature.selectMods)),
    filter(([, mods]) => !!mods),
    map(([filters, mods]) => saveFilteredMods({filteredMods: this.filter(mods || [], filters)}))
  ));

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {Store<State>} store$
   * @param {ModsService} modsService
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>, private readonly modsService: ModsService) {}

  /**
   * Filters the list of mods based on the provided filters.
   *
   * @private
   * @param {Mod[]} mods
   * @param {ModsForm} filters
   * @param {ModsForm} filters.query
   * @param {ModsForm} filters.advanced
   * @param {ModsForm} filters.versions
   * @param {ModsForm} filters.loaders
   * @param {ModsForm} filters.wiki
   * @param {ModsForm} filters.api
   * @param {ModsForm} filters.template
   * @param {ModsForm} filters.stable
   * @param {ModsForm} filters.client
   * @param {ModsForm} filters.server
   * @returns {Mod[]}
   */
  private filter(mods: Mod[], {query, advanced, versions, loaders, wiki, api, template, stable, client, server}: ModsForm): Mod[] {
    // eslint-disable-next-line complexity
    return advanced ? this.filterByName(mods, query).filter(mod =>
      versions.every(version => mod.versions.includes(version)) &&
      loaders.every(version => mod.loaders.includes(version)) &&
      (!wiki || mod.hasWiki) &&
      (!api || mod.isApi) &&
      (!template || mod.isTemplate) &&
      (!stable || mod.stable) &&
      (client === null || mod.client === client) &&
      (server === null || mod.server === server)) : this.filterByName(mods, query);
  }

  /**
   * Filters the list of mods based on the query.
   *
   * @private
   * @param {Mod[]} mods
   * @param {string} query
   * @returns {Mods[]}
   */
  private filterByName(mods: Mod[], query: string): Mod[] {
    return query ? new Fuse(mods.map(mod => ({
      ...mod,
      shorthand: mod.title.split(' ').map(word => word[0]).join('')
    })), {
      keys: ['name', 'title', 'shorthand'],
      isCaseSensitive: false,
      minMatchCharLength: 0,
      shouldSort: true,
      threshold: 0.5,
      ignoreLocation: true,
      ignoreFieldNorm: true
    }).search(query).map(result => result.item) : mods;
  }

  /**
   * Checks whether the specified side is required.
   *
   * @private
   * @param {string} readme
   * @param {'client' | 'server'} side
   * @returns {boolean}
   */
  private checkSide(readme: string, side: 'client' | 'server'): boolean {
    return readme.match(/!\[Overlay\]\(.*\/(.*?)\.svg\)/)?.[0].includes(side) || false;
  }
}
