import {AsyncPipe} from '@angular/common';
import {HttpErrorResponse} from '@angular/common/http';
import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs';

import {FooterComponent} from './component/footer/footer.component';
import {HeaderComponent} from './component/header/header.component';
import {LoaderComponent} from './component/loader/loader.component';

import {SubscriberComponent} from '~cn/core/abstract/subscriber.component';
import {ROUTE, isValidRoute} from '~cn/core/model/route.enum';
import {State, coreFeature} from '~cn/core/redux/feature';
import {SnackBarComponent} from '~cn/shared/component/snack-bar/snack-bar.component';

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
export class FrameComponent extends SubscriberComponent {
  /**
   * Whether the website is loading.
   *
   * @public
   * @readonly
   * @type {Observable<boolean>}
   */
  public readonly loading$ = this.store$.select(coreFeature.selectLoading);

  /**
   * Which kind of loading is being performed.
   *
   * @public
   * @readonly
   * @type {Observable<ProgressBarMode>}
   */
  public readonly loadingType$ = this.store$.select(coreFeature.selectLoadingType);

  /**
   * Loading progress.
   *
   * @public
   * @readonly
   * @type {Observable<number>}
   */
  public readonly progress$ = this.store$.select(coreFeature.selectProgress);

  /**
   * Latest HTTP error.
   *
   * @private
   * @readonly
   * @type {Observable<HttpErrorResponse | null>}
   */
  private readonly error$ = this.store$.select(coreFeature.selectError);

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
   * @param {MatSnackBar} snackBar
   */
  public constructor(private readonly store$: Store<State>, private readonly router: Router, private readonly title: Title, private readonly snackBar: MatSnackBar) {
    super();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => this.setTitle((event as NavigationEnd).urlAfterRedirects.slice(1)));
    this.error$.pipe(filter(error => !!error), this.takeUntil()).subscribe(error => this.snackBar.openFromComponent(SnackBarComponent, {data: error}).onAction().pipe(this.takeUntil()).subscribe(() => window.open(
      `https://github.com/Crystal-Nest/crystalnest.it/issues/new?assignees=Crystal-Spider&labels=bug%2Cmedium+priority&projects=&title=${error!.status}%20HTTP%20error&error=${this.encodeError(error!)}&template=error_report.yml`,
      '_blank'
    )));
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

  /**
   * Encodes a JSON snippet for a GitHub query URL to open an issue.
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns {string}
   */
  private encodeError(error: HttpErrorResponse): string {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return encodeURI(`\`\`\`json\n${JSON.stringify(error, null, 2)}\n\`\`\``);
  }
}
