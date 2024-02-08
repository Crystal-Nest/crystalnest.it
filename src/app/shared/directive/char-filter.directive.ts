import {Directive, ElementRef, HostListener, Input} from '@angular/core';

/**
 * Special keyboard keys that should never be prevented.
 *
 * @type {string[]}
 */
const specialKeys: string[] = [
  'Backspace',
  'Tab',
  'End',
  'Home',
  'ArrowLeft',
  'ArrowRight',
  'Del',
  'Delete'
];

/**
 * Directive for custom inputs.
 *
 * @export
 * @class CharFilterDirective
 * @typedef {CharFilterDirective}
 */
@Directive({
  selector: '[charFilter]',
  standalone: true
})
export class CharFilterDirective {
  /**
   * The {@link RegExp Regular Expression} used to check whether a given string is allowed.
   *
   * @public
   * @type {(string | RegExp)}
   */
  @Input()
  public regex!: string | RegExp;

  /**
   * @constructor
   * @public
   * @param {ElementRef<HTMLInputElement>} input
   */
  public constructor(private readonly input: ElementRef<HTMLInputElement>) {}

  /**
   * Prevents inserting not-allowed characters.
   *
   * @public
   * @param {KeyboardEvent} event
   */
  @HostListener('keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent) {
    const {value, selectionStart, selectionEnd} = this.input.nativeElement, nextValue = `${value.slice(0, selectionStart!)}${event.key}${value.slice(selectionEnd!)}`;
    if (!(specialKeys.includes(event.key) || new RegExp(this.regex).test(nextValue))) {
      event.preventDefault();
    }
  }
}
