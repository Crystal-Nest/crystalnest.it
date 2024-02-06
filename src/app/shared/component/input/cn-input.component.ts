import {CommonModule} from '@angular/common';
import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {CharFilterDirective} from '../../directive/char-filter.directive';
import {CnControlValueAccessor} from '../abstract/cn-control-value-accessor';

/**
 * Crystal Nest input component.
 *
 * @export
 * @class CnInputComponent
 * @typedef {CnInputComponent}
 * @extends {CnControlValueAccessor<string>}
 */
@Component({
  selector: 'cn-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    CharFilterDirective
  ],
  templateUrl: 'cn-input.component.html',
  styleUrls: ['cn-input.component.scss']
})
export class CnInputComponent extends CnControlValueAccessor<string> implements AfterViewInit {
  /**
   * Regex to filter the user input.
   *
   * @public
   * @type {{}}
   */
  @Input()
  public regex = /.*/;

  /**
   * `HTMLInputElement` child element.
   *
   * @public
   * @type {?ElementRef<HTMLInputElement>}
   */
  @ViewChild('inputElement', {read: ElementRef<HTMLInputElement>})
  public inputElement?: ElementRef<HTMLInputElement>;

  /**
   * Handles the `blur` event.
   *
   * @public
   * @param {FocusEvent} _event
   */
  public blur(_event: FocusEvent): void {
    this.onTouched();
  }

  /**
   * Handles the `input` event.
   *
   * @public
   * @param {Event} _event
   */
  public input(_event: Event): void {
    this.writeValue(this.value);
  }

  /**
   * Handles the `empty` event.
   *
   * @public
   * @param {MouseEvent} event
   */
  public empty(event: MouseEvent): void {
    event.stopPropagation();
    if (this.value) {
      this.writeValue('');
      this.inputElement?.nativeElement.focus();
    }
  }
}
