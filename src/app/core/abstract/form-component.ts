import {Directive, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable, OperatorFunction, debounceTime, distinctUntilChanged, filter, pairwise, startWith} from 'rxjs';

import {SubscriberComponent} from './subscriber.component';
import {FormType} from '../model/form-type.type';
import {TypedChanges} from '../model/typed-changes.type';

/**
 * Value being used to call `patchValue` of a {@link FormGroup}.  
 * Necessary because the compiler is not smart enough to understand that `T` already satisfies the required constraint.
 *
 * @typedef {PatchingValue}
 * @template T
 */
type PatchingValue<T> = Parameters<FormGroup<FormType<T>>['patchValue']>[0];

/**
 * Abstract Form component.
 *
 * @export
 * @abstract
 * @class FormComponent
 * @typedef {FormComponent}
 * @template T
 * @implements {OnChanges}
 */
@Directive()
export abstract class FormComponent<T> extends SubscriberComponent implements OnChanges {
  /**
   * Optional form data to persist.
   *
   * @public
   * @type {?(Partial<T> | null)}
   */
  @Input()
  public formData?: Partial<T> | null;

  /**
   * Emitter for the `submit` event.
   *
   * @public
   * @readonly
   * @type {EventEmitter<T>}
   */
  @Output()
  public readonly onSubmit: EventEmitter<T> = new EventEmitter();

  /**
   * Form.
   *
   * @public
   * @type {FormGroup<FormType<T>>}
   */
  public readonly form: FormGroup<FormType<T>> = new FormGroup(this.initForm());

  /**
   * Whether the {@link form} is valid.
   *
   * @public
   * @readonly
   * @type {boolean}
   */
  public get validity() {
    return this.form.valid;
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public ngOnChanges(changes: TypedChanges<FormComponent<T>>): void {
    if (changes.formData && this.formData) {
      this.form.patchValue(this.formData as PatchingValue<T>);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  /**
   * Emits the `submit` event.
   *
   * @public
   */
  public emitSubmit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.getRawValue() as T);
    }
  }

  /**
   * Shorthand for `valueChanges` form subscriptions.
   *
   * @protected
   * @param {(value: [T, T]) => void} callback
   * @param {(value: [T, T], index: number) => boolean} [allower=() => true]
   * @param {number} [interval=0]
   */
  protected formChanges(callback: (value: [T, T]) => void, allower: (value: [T, T], index: number) => boolean = () => true, interval = 0) {
    (this.form.valueChanges as Observable<T>).pipe(startWith(this.form.value) as OperatorFunction<T, T>, debounceTime(interval), distinctUntilChanged() as OperatorFunction<T, T>, pairwise(), filter(allower), this.takeUntil()).subscribe(callback);
  }

  /**
   * Shorthand for `valueChanges` form field subscriptions.
   *
   * @protected
   * @template {keyof T} K
   * @param {K} control
   * @param {(value: T[K]) => void} callback
   * @param {(value: T[K], index: number) => boolean} [allower=() => true]
   * @param {number} [interval=0]
   */
  protected valueChanges<K extends keyof T>(control: K, callback: (value: T[K]) => void, allower: (value: T[K], index: number) => boolean = () => true, interval = 0) {
    (this.form.controls[control].valueChanges as Observable<T[K]>).pipe(startWith(this.form.controls[control].value), debounceTime(interval), distinctUntilChanged(), filter(allower), this.takeUntil()).subscribe(callback);
  }

  /**
   * Returns the initial value for the {@link form}.
   *
   * @protected
   * @abstract
   * @returns {FormType<T>}
   */
  protected abstract initForm(): FormType<T>;
}
