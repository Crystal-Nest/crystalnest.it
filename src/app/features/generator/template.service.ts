import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

/**
 * Handles HTTP calls regarding the mod template.
 *
 * @export
 * @class TemplateService
 * @typedef {TemplateService}
 */
@Injectable()
export class TemplateService {
  /**
   * @constructor
   * @public
   * @param {HttpClient} http
   */
  public constructor(private readonly http: HttpClient) {}

  /**
   * Retrieves the `template.zip` asset.
   *
   * @public
   * @returns {Observable<ArrayBuffer>}
   */
  public getTemplate() {
    return this.http.get('assets/template.zip', {responseType: 'arraybuffer'});
  }
}
