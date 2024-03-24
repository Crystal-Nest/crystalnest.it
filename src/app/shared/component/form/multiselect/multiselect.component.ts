import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgControl} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {isEqual} from 'radash';

import {MultiSelectPanelComponent} from './components/multiselect-panel/multiselect-panel.component';
import {MultiSelectTableComponent} from './components/multiselect-table/multiselect-table.component';
import {MultiSelectOption} from './model/multiselect-option';
import {CnControlValueAccessor} from '../cva/control-value-accessor';

import {TypedChanges} from '~cn/core/model/typed-changes.type';

/**
 * Crystal Nest multiSelect component.
 *
 * @export
 * @class MultiSelectComponent
 * @typedef {MultiSelectComponent}
 * @extends {CnControlValueAccessor<number[]>}
 * @implements {OnChanges}
 */
@Component({
  selector: 'cn-multiselect',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MultiSelectPanelComponent,
    MultiSelectTableComponent
  ],
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent extends CnControlValueAccessor<string[]> implements OnChanges, OnInit {
  /**
   * Selectable values, pairs of id-label.
   *
   * @public
   * @type {!Record<string, string>}
   */
  @Input()
  public values!: Record<string, string>;

  /**
   * `HTMLInputElement` child element.
   *
   * @public
   * @type {?ElementRef<HTMLInputElement>}
   */
  @ViewChild('inputElement', {read: ElementRef<HTMLInputElement>})
  public inputElement?: ElementRef<HTMLInputElement>;

  /**
   * `MultiSelectPanelComponent` child element.
   *
   * @public
   * @type {!MultiSelectPanelComponent}
   */
  @ViewChild(MultiSelectPanelComponent)
  public overlayPanel!: MultiSelectPanelComponent;

  /**
   * Selectable options.
   *
   * @public
   * @type {MultiSelectOption[]}
   */
  public options: MultiSelectOption[] = [];

  /**
   * Whether the overlay panel is open.
   *
   * @public
   * @type {boolean}
   */
  public panelOpen = false;

  /**
   * Input value, `ngModel`.
   *
   * @public
   * @type {string}
   */
  public displayValue = '';

  /**
   * Special keyboard keys that are allowed from the user.
   *
   * @private
   * @readonly
   * @type {string[]}
   */
  private readonly specialKeys: string[] = [
    'ArrowUp',
    'ArrowDown',
    'Tab',
    'Enter',
    'Esc'
  ];

  /**
   * Whether {@link options} should be updated when setting this {@link value}.  
   * Needed to avoid flickering of checkboxes.
   *
   * @private
   * @type {boolean}
   */
  private shouldUpdateOptions = true;

  /**
   * Value before refreshing options and emptying the current value.  
   * Currently only needed to restore the actual value after the first `ngOnChanges` fires.
   *
   * @private
   * @type {(string[] | null)}
   */
  private beforeRefreshValue: string[] | null = null;

  /**
   * Icon to display.
   *
   * @public
   * @readonly
   * @type {string}
   */
  public get icon(): string {
    return this.panelOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  /**
   * @constructor
   * @public
   * @param {NgControl} ngControl
   * @param {ChangeDetectorRef} cdr
   * @param {ElementRef<HTMLElement>} eRef
   */
  public constructor(ngControl: NgControl, cdr: ChangeDetectorRef, private readonly eRef: ElementRef<HTMLElement>) {
    super(ngControl, cdr);
  }

  /**
   * Handles `focusin` and `keyDown.enter` to open the panel.
   *
   * @public
   * @param {?KeyboardEvent} [event]
   */
  @HostListener('focusin')
  @HostListener('keyDown.enter', ['$event'])
  public openPanel(event?: KeyboardEvent) {
    if (!this.isDisabled) {
      event?.preventDefault();
      if (!this.panelOpen) {
        this.overlayPanel.openPanel();
      }
    }
  }

  /**
   * Handles several `keyDown` events with special keys to close the panel.
   *
   * @public
   */
  @HostListener('keyDown.tab')
  @HostListener('keyDown.shift.tab')
  @HostListener('keyDown.escape')
  public closePanel() {
    if (this.panelOpen) {
      this.overlayPanel.closePanel();
    }
  }

  /**
   * @inheritdoc
   */
  public ngOnChanges(changes: TypedChanges<MultiSelectComponent>): void {
    if (changes.values && !isEqual(changes.values.currentValue, changes.values.previousValue)) {
      this.beforeRefreshValue = this.value;
      this.refreshOptions();
    }
  }

  /**
   * @inheritdoc
   */
  public override ngOnInit(): void {
    super.ngOnInit();
    this.writeValue(this.beforeRefreshValue);
    if (this.formControl) {
      this.formControl.markAsPristine();
      this.formControl.markAsUntouched();
    }
  }

  /**
   * @inheritdoc
   */
  public override setValue(): void {
    if (this.shouldUpdateOptions) {
      this.options = this.options.map(option => ({
        ...option,
        selected: !!this.value?.includes(option.key)
      }));
    } else {
      this.shouldUpdateOptions = true;
    }
    this.displayValue = this.options?.filter(option => option.selected).map(option => option.label).join(', ') || '';
  }

  /**
   * Closes the overlay panel when disabled.
   * 
   * @inheritdoc
   */
  public override setDisabledState(isDisabled: boolean) {
    super.setDisabledState(isDisabled);
    if (isDisabled && this.overlayPanel) {
      this.overlayPanel.closePanel();
    }
  }

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
   * Handles the `click` event on the panel.
   *
   * @public
   * @param {MouseEvent} event
   */
  public panelClick(event: MouseEvent) {
    if (!this.isDisabled) {
      if (event) {
        if (!this.eRef.nativeElement.contains(event.target as Node)) {
          this.closePanel();
        }
      } else if (this.panelOpen) {
        this.inputElement?.nativeElement.focus();
      }
    }
  }

  /**
   * Handles the `click` event on the icon.
   *
   * @public
   * @param {MouseEvent} event
   */
  public togglePanel(event: MouseEvent) {
    if (!this.isDisabled) {
      event.stopPropagation();
      if (this.panelOpen) {
        this.overlayPanel.closePanel();
      } else {
        this.overlayPanel.openPanel();
      }
    }
  }

  /**
   * Handles the `panel toggle` event.
   *
   * @public
   * @param {boolean} event
   */
  public panelToggle(event: boolean) {
    if (!this.isDisabled) {
      this.panelOpen = event;
    }
  }

  /**
   * Prevents user input in the field.
   *
   * @public
   * @param {KeyboardEvent} event
   */
  public preventInput(event: KeyboardEvent) {
    if (!this.specialKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  /**
   * Cancels the given event.
   *
   * @public
   * @param {Event} event
   */
  public prevent(event: Event) {
    event.preventDefault();
  }

  /**
   * Handles the `confirm` event.
   *
   * @public
   * @param {string[]} event
   */
  public confirm(event: string[]) {
    if (!this.isDisabled) {
      this.shouldUpdateOptions = false;
      this.writeValue(event);
    }
  }

  /**
   * Refreshes this {@link options} and empties all selections.
   *
   * @private
   */
  private refreshOptions() {
    this.options = Object.entries(this.values).sort(([, v1], [, v2]) => v1.trim().toLowerCase().localeCompare(v2.trim().toLowerCase())).map(([key, label]) => ({
      key,
      label,
      selected: false
    }));
    this.writeValue([]);
    if (this.formControl) {
      this.formControl.markAsPristine();
      this.formControl.markAsUntouched();
      this.cdr.detectChanges();
    }
  }
}
