import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {ChangeDetectorRef, Component, Input, NgZone, ViewChild} from '@angular/core';
import {FormsModule, NgControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {take} from 'rxjs';

import {CnControlValueAccessor} from '../cva/control-value-accessor';

import {CharFilterDirective} from '~cn/shared/directive/char-filter.directive';

/**
 * Crystal Nest textarea component.
 *
 * @export
 * @class TextareaComponent
 * @typedef {TextareaComponent}
 */
@Component({
  selector: 'cn-textarea',
  standalone: true,
  imports: [FormsModule, MatInputModule, CharFilterDirective],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent extends CnControlValueAccessor<string> {
  /**
   * Regex to filter the user input.
   *
   * @public
   * @type {(string | RegExp)}
   */
  @Input()
  public regex: string | RegExp = /(.|\n)*/;

  /**
   * `CdkTextareaAutosize` child element.
   *
   * @public
   * @type {!CdkTextareaAutosize}
   */
  @ViewChild(CdkTextareaAutosize)
  public textarea!: CdkTextareaAutosize;

  /**
   * @constructor
   * @public
   * @param {NgZone} ngZone
   * @param {NgControl} ngControl
   * @param {ChangeDetectorRef} cdr
   */
  public constructor(private readonly ngZone: NgZone, ngControl: NgControl, cdr: ChangeDetectorRef) {
    super(ngControl, cdr);
  }

  /**
   * Handles the `blur` event.
   *
   * @public
   */
  public blur(): void {
    this.onTouched();
  }

  /**
   * Handles the `input` event.
   *
   * @public
   */
  public input(): void {
    this.writeValue(this.value);
  }

  /**
   * Waits for changes to be applied, then triggers textarea resize.
   *
   * @public
   */
  public resize() {
    this.ngZone.onStable.pipe(take(1)).subscribe(() => this.textarea.resizeToFitContent(true));
  }
}
