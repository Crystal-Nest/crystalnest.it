import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {AngularDeviceInformationService} from 'angular-device-information';
import {ignoreElements, tap} from 'rxjs';

import {download, openIssue} from './actions';
import {State} from './feature';

/**
 * Core effects.
 *
 * @export
 * @class CoreEffects
 * @typedef {CoreEffects}
 */
@Injectable()
export class CoreEffects {
  /**
   * Intercepts the action {@link download} to download the given `file`.
   *
   * @public
   * @readonly
   * @type {Observable<never>}
   */
  public readonly download$ = createEffect(() => this.actions$.pipe(
    ofType(download),
    tap(({file, id}) => this.download(file, id)),
    ignoreElements()
  ), {dispatch: false});

  /**
   * Intercepts the action {@link openIssue} to open a new GitHub issue with precompiled fields.
   *
   * @public
   * @readonly
   * @type {Observable<never>}
   */
  public readonly openIssue$ = createEffect(() => this.actions$.pipe(
    ofType(openIssue),
    tap(({title, body}) => window.open(
      `https://github.com/Crystal-Nest/crystalnest.it/issues/new?assignees=Crystal-Spider&labels=bug%2Cmedium+priority&projects=&title=${encodeURIComponent(title)}&error=${encodeURIComponent(body)}&os=${this.deviceInfo}&template=error_report.yml`,
      '_blank'
    )),
    ignoreElements()
  ), {dispatch: false});

  /**
   * Device information.
   *
   * @private
   * @readonly
   * @type {string}
   */
  private get deviceInfo() {
    const {os, osVersion, browser, browserMajorVersion} = this.deviceInformationService.getDeviceInfo();
    return encodeURIComponent(`${this.deviceInformationService.getDeviceType()} - ${os} ${osVersion}, ${browser} ${browserMajorVersion}`);
  }

  /**
   * @constructor
   * @public
   * @param {Actions} actions$
   * @param {Store<State>} store$
   * @param {AngularDeviceInformationService} deviceInformationService
   */
  public constructor(private readonly actions$: Actions, private readonly store$: Store<State>, private readonly deviceInformationService: AngularDeviceInformationService) {}

  /**
   * Downloads the given `file`.
   *
   * @private
   * @param {Blob} file
   * @param {string} id
   */
  private download(file: Blob, id: string) {
    const anchor = document.createElement('a');
    anchor.style.display = 'none';
    anchor.href = URL.createObjectURL(file);
    anchor.download = `cobweb-mod-skeleton (${id})`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }
}
