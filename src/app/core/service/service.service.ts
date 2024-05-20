/* eslint-disable rxjs/finnish */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

/**
 * HTTP service options.
 *
 * @interface Options
 * @typedef {Options}
 * @template {'text' | 'json' | 'arraybuffer'} T
 */
interface Options<T extends 'text' | 'json' | 'arraybuffer'> {
  /**
   * Optional headers.
   *
   * @type {?Record<string, string>}
   */
  headers?: Record<string, string>;
  /**
   * Optional response type.
   *
   * @type {?T}
   */
  responseType?: T;
}

/**
 * Generic HTTP service.
 *
 * @export
 * @abstract
 * @class Service
 * @typedef {Service}
 */
@Injectable()
export abstract class Service {
  /**
   * @constructor
   * @public
   * @param {HttpClient} http
   */
  public constructor(private readonly http: HttpClient) {}

  /**
   * Makes a GET request for a string.
   *
   * @protected
   * @param {string} endpoint
   * @param {?Options<'text'>} [options]
   * @returns {Observable<string>}
   */
  protected get(endpoint: string, options?: Options<'text'>): Observable<string>;

  /**
   * Makes a GET request for a data stream.
   *
   * @protected
   * @param {string} endpoint
   * @param {?Options<'arraybuffer'>} [options]
   * @returns {Observable<ArrayBuffer>}
   */
  protected get(endpoint: string, options?: Options<'arraybuffer'>): Observable<ArrayBuffer>;

  /**
   * Makes a GET request for an object.
   *
   * @protected
   * @template T
   * @param {string} endpoint
   * @param {?Options<'json'>} [options]
   * @returns {Observable<T>}
   */
  protected get<T>(endpoint: string, options?: Options<'json'>): Observable<T>;

  /**
   * Makes a GET request.
   *
   * @protected
   * @template T
   * @param {string} endpoint
   * @param {Options<'text' | 'json' | 'arraybuffer'>} [param0={}]
   * @param {Record<string, string>} [param0.headers={}]
   * @param {"text" | "json" | "arraybuffer"} [param0.responseType='json']
   * @returns {Observable<unknown>}
   */
  protected get<T>(endpoint: string, {headers = {}, responseType = 'json'}: Options<'text' | 'json' | 'arraybuffer'> = {}): Observable<unknown> {
    return this.http.get<T>(
      endpoint,
      {
        headers,
        responseType: responseType as never,
        reportProgress: true
      }
    );
  }

  /**
   * Makes a POST request for a string.
   *
   * @protected
   * @param {string} endpoint
   * @param {unknown} body
   * @param {?Options<'text'>} [options]
   * @returns {Observable<string>}
   */
  protected post(endpoint: string, body: unknown, options?: Options<'text'>): Observable<string>;

  /**
   * Makes a POST request for a data stream.
   *
   * @protected
   * @param {string} endpoint
   * @param {unknown} body
   * @param {?Options<'arraybuffer'>} [options]
   * @returns {Observable<ArrayBuffer>}
   */
  protected post(endpoint: string, body: unknown, options?: Options<'arraybuffer'>): Observable<ArrayBuffer>;

  /**
   * Makes a POST request for an object.
   *
   * @protected
   * @template T
   * @param {string} endpoint
   * @param {unknown} body
   * @param {?Options<'json'>} [options]
   * @returns {Observable<T>}
   */
  protected post<T>(endpoint: string, body: unknown, options?: Options<'json'>): Observable<T>;

  /**
   * Makes a POST request.
   *
   * @protected
   * @template T
   * @param {string} endpoint
   * @param {unknown} body
   * @param {Options<'text' | 'json' | 'arraybuffer'>} [param0={}]
   * @param {Record<string, string>} [param0.headers={}]
   * @param {"text" | "json" | "arraybuffer"} [param0.responseType='json']
   * @returns {Observable<unknown>}
   */
  protected post<T>(endpoint: string, body: unknown, {headers = {}, responseType = 'json'}: Options<'text' | 'json' | 'arraybuffer'> = {}): Observable<unknown> {
    return this.http.post<T>(
      endpoint,
      body,
      {
        headers,
        responseType: responseType as never,
        reportProgress: true
      }
    );
  }
}
