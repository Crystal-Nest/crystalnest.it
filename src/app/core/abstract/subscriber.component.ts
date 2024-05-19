import {Directive, OnDestroy} from '@angular/core';
import {MonoTypeOperatorFunction, Subject, takeUntil} from 'rxjs';

/**
 * Abstract component that can manage subscriptions.
 *
 * @export
 * @abstract
 * @class SubscriberComponent
 * @typedef {SubscriberComponent}
 * @implements {OnDestroy}
 */
@Directive()
export abstract class SubscriberComponent implements OnDestroy {
  /**
   * End of life {@link Subject}.
   *
   * @private
   * @readonly
   * @type {Subject<void>}
   */
  private readonly subject$: Subject<void> = new Subject();

  /**
   * @inheritdoc
   * 
   * @public
   */
  public ngOnDestroy(): void {
    this.subject$.next();
    this.subject$.complete();
  }

  /**
   * Wrapper around {@link takeUntil} for this {@link subject$}.
   *
   * @protected
   * @template T
   * @returns {MonoTypeOperatorFunction<T>}
   */
  protected takeUntil<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this.subject$);
  }
}
