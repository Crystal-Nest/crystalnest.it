import {Directive, OnInit, Input, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/**
 * Custom error matcher.
 *
 * @class CnErrorStateMatcher
 * @typedef {CnErrorStateMatcher}
 * @template T
 * @implements {ErrorStateMatcher}
 */
class CnErrorStateMatcher<T> implements ErrorStateMatcher {
  /**
   * @constructor
   * @public
   * @param {CnControlValueAccessor<T>} cva
   */
  public constructor(private readonly cva: CnControlValueAccessor<T>) {}

  /**
   * Whether the {@link cva} is in an error state.
   *
   * @public
   * @param {(AbstractControl<unknown, unknown> | null)} _control unused, {@link cva} is used instead.
   * @param {(FormGroupDirective | NgForm | null)} _form unused, {@link cva} is used instead.
   * @returns {boolean}
   */
  public isErrorState(_control: AbstractControl<unknown, unknown> | null, _form: FormGroupDirective | NgForm | null): boolean {
    return !!this.cva.formControl && this.cva.formControl.invalid && (this.cva.formControl.dirty || this.cva.formControl.touched);
  }
}

/**
 * Utility wrapper for {@link ControlValueAccessor}.
 *
 * @export
 * @abstract
 * @class CnControlValueAccessor
 * @typedef {CnControlValueAccessor}
 * @template T
 * @implements {ControlValueAccessor}
 * @implements {OnInit}
 */
@Directive()
export abstract class CnControlValueAccessor<T> implements ControlValueAccessor, OnInit, AfterViewInit {
  /**
   * Label.
   *
   * @public
   * @type {string}
   */
  @Input({required: true})
  public label!: string;

  /**
   * Whether it's disabled.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public isDisabled = false;

  /**
   * Whether it's required.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public isRequired = false;

  /**
   * Hint.
   *
   * @public
   * @type {string}
   */
  @Input()
  public hint = '';

  /**
   * Custom error matcher.
   *
   * @public
   * @type {CnErrorStateMatcher<T>}
   */
  public errorMatcher = new CnErrorStateMatcher<T>(this);

  /**
   * The form control connected to this component.
   *
   * @public
   * @type {?AbstractControl<T | null>}
   */
  public formControl?: AbstractControl<T | null>;

  /**
   * Value.  
   * Generally it should be updated only through `ngModel` or `AbstractControl` methods (including {@link writeValue}).
   *
   * @public
   * @type {(T | null)}
   */
  public value: T | null = null;

  /**
   * Previous value.  
   *
   * @protected
   * @type {?(T | null)}
   */
  protected previousValue?: T | null;

  /**
   * Whether this {@link formControl} is invalid.
   *
   * @public
   * @readonly
   * @type {boolean}
   */
  public get invalid(): boolean {
    return !!this.formControl && this.formControl.invalid && (this.formControl.dirty || this.formControl.touched);
  }

  /**
   * Error message.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get errorMessage(): string {
    if (this.invalid) {
      if (!this.formControl || this.formControl.hasError('required')) {
        return 'Field is required';
      }
      return 'Field is invalid';
    }
    return '';
  }

  /**
   * @constructor
   * @public
   * @param {NgControl} ngControl
   * @param {ChangeDetectorRef} cdr
   */
  public constructor(private readonly ngControl: NgControl, protected readonly cdr: ChangeDetectorRef) {
    this.ngControl.valueAccessor = this;
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public ngOnInit(): void {
    this.formControl = this.ngControl.control!;
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public ngAfterViewInit(): void {
    if (this.formControl) {
      this.writeValue(this.formControl.value);
    }
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public writeValue(value: T | null): void {
    // Update also this.value for compatibility with subclasses not using ngModel on this.value.
    this.value = value;
    // Since ngModel updates this.value before this method is called, need to check against this.previousValue instead because it's the only one to get updated only here.
    if (this.previousValue !== value) {
      this.onChange(value);
      this.onTouched();
    }
    this.previousValue = value;
    this.setValue();
    this.cdr.detectChanges();
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * @inheritdoc
   * 
   * @public
   */
  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Function called when the control's value changes in the UI.
   *
   * @param {T | null} _
   */
  protected onChange: (value: T | null) => void = (_: T | null) => {};

  /**
   * Function called when the control's is blurred or touched.
   */
  protected onTouched: () => void = () => {};

  /**
   * Hook fired before decting changes and after setting this {@link value}.
   *
   * @protected
   * @abstract
   */
  protected setValue(): void {
    // To optionally override in the subclass.
  }
}
