import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs';

import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {LoaderComponent} from './component/loader/loader.component';

import {ROUTE, isValidRoute} from '~cn/core/model/route.enum';
import {State, coreFeature} from '~cn/core/redux/feature';

/**
 * Frame component.
 *
 * @export
 * @class FrameComponent
 * @typedef {FrameComponent}
 */
@Component({
  selector: 'cn-frame',
  standalone: true,
  imports: [
    AsyncPipe,
    LoaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './frame.component.html',
  styleUrl: './frame.component.scss'
})
export class FrameComponent {
  /**
   * Whether the website is loading.
   *
   * @public
   * @type {Observable<boolean>}
   */
  public loading$ = this.store$.select(coreFeature.selectLoading);

  /**
   * Which kind of loading is being performed.
   *
   * @public
   * @type {Observable<ProgressBarMode>}
   */
  public loadingType$ = this.store$.select(coreFeature.selectLoadingType);

  /**
   * Loading progress.
   *
   * @public
   * @type {Observable<number>}
   */
  public progress$ = this.store$.select(coreFeature.selectProgress);

  /**
   * Active route.
   *
   * @public
   * @type {ROUTE}
   */
  public activeRoute: ROUTE = ROUTE.HOME;

  /**
   * @constructor
   * @public
   * @param {Store<State>} store$
   * @param {Router} router
   * @param {Title} title
   */
  public constructor(private readonly store$: Store<State>, private readonly router: Router, private readonly title: Title) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => this.setTitle((event as NavigationEnd).urlAfterRedirects.slice(1)));
  }

  /**
   * Sets the tab title based on the current route.
   *
   * @private
   * @param {string} route
   */
  private setTitle(route: string) {
    switch (route) {
      case ROUTE.HOME:
        this.title.setTitle('Crystal Nest');
        break;
      case ROUTE.GENERATOR:
        this.title.setTitle('Mod generator - Crystal Nest');
        break;
      case ROUTE.VERSIONING:
        this.title.setTitle('Mod versioning - Crystal Nest');
        break;
      case ROUTE.MODS:
        this.title.setTitle('Browse mods - Crystal Nest');
        break;
      default:
        this.title.setTitle('Not found - Crystal Nest');
        break;
    }
    this.activeRoute = isValidRoute(route) ? route as ROUTE : ROUTE.HOME;
  }
}
