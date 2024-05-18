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

@Injectable()
export class ModsEffects {
  private readonly loaderTopics = ['fabric', 'forge', 'neoforge'].map(loader => `minecraft-${loader}-mod`);

  public retrieveMods$ = createEffect(() => this.actions$.pipe(
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

  public filterMods$ = createEffect(() => this.actions$.pipe(
    ofType(filterMods),
    withLatestFrom(this.store$.select(modsFeature.selectMods)),
    filter(([, mods]) => !!mods),
    map(([filters, mods]) => saveFilteredMods({filteredMods: this.search(mods || [], filters)}))
  ));

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {Store<State>} store$
   * @param {ModsService} modsService
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>, private readonly modsService: ModsService) {}

  private search(mods: Mod[], {query, client, server}: ModsForm): Mod[] {
    return query ? new Fuse(mods.map(mod => ({
      ...mod,
      shorthand: mod.title.split(' ').map(word => word[0]).join('')
    })), {
      keys: ['title', 'shorthand'],
      isCaseSensitive: false,
      minMatchCharLength: 0,
      shouldSort: true,
      threshold: 0.5,
      ignoreLocation: true,
      ignoreFieldNorm: true
    }).search(query).map(result => result.item) : mods;
  }

  private checkSide(readme: string, side: 'client' | 'server'): boolean {
    return readme.match(/!\[Overlay\]\(.*\/(.*?)\.svg\)/)?.[0].includes(side) || false;
  }
}
