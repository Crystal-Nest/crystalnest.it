import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {License} from '../model/license.type';
import {LICENSES} from '../model/template.const';

import {Service} from '~cn/core/service/service.service';

/**
 * Handles HTTP calls regarding the mod template.
 *
 * @export
 * @class LicenseService
 * @typedef {LicenseService}
 * @extends {Service}
 */
@Injectable()
export class LicenseService extends Service {
  private readonly licenses: Record<License, string> = {...LICENSES};

  /**
   * @constructor
   * @public
   * @param {HttpClient} http
   */
  public constructor(http: HttpClient) {
    super(http);
    this.preload();
  }

  /**
   * Returns the full text of the specified license.
   *
   * @public
   * @param {License} id 
   * @returns {string} 
   */
  public getLicense(id: License): string {
    return this.licenses[id];
  }

  /**
   * Preloads all available licenses.
   *
   * @private
   */
  private preload(): void {
    for (const license in this.licenses) {
      if (this.licenses.hasOwnProperty(license)) {
        this.get(`assets/licenses/LICENSE-${license}`, {responseType: 'text'}).subscribe(text => (this.licenses[license as License] = text));
      }
    }
  }
}
