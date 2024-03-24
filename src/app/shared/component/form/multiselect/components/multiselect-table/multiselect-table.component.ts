import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {isEqual} from 'radash';

import {CheckboxComponent} from '../../../checkbox/checkbox.component';
import {MultiSelectOption} from '../../model/multiselect-option';

import {FormType} from '~cn/core/model/form-type.type';
import {TypedChanges} from '~cn/core/model/typed-changes.type';

/**
 * Crystal Nest multiSelect table component.
 *
 * @export
 * @class MultiSelectTableComponent
 * @typedef {MultiSelectTableComponent}
 * @implements {OnChanges}
 */
@Component({
  selector: 'cn-multiselect-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    CheckboxComponent
  ],
  templateUrl: './multiselect-table.component.html',
  styleUrl: './multiselect-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectTableComponent implements OnChanges {
  /**
   * Whether to show the table.
   *
   * @public
   * @type {boolean}
   */
  @Input()
  public visible = false;

  /**
   * Multiselect options.
   *
   * @public
   * @type {!MultiSelectOption[]}
   */
  @Input()
  public options!: MultiSelectOption[];

  /**
   * Emitter for the `options` `ngModel`.
   *
   * @public
   * @readonly
   * @type {EventEmitter<MultiSelectOption[]>}
   */
  @Output()
  public readonly optionsChange: EventEmitter<MultiSelectOption[]> = new EventEmitter();

  /**
   * Emitter for the `confirm` event.
   *
   * @public
   * @readonly
   * @type {EventEmitter<string[]>}
   */
  @Output()
  public readonly confirm: EventEmitter<string[]> = new EventEmitter();

  /**
   * Selection form group.
   *
   * @public
   * @type {FormGroup<FormType<Record<`check-${string}`, boolean>>>}
   */
  public form: FormGroup<FormType<Record<`check-${string}`, boolean>>> = new FormGroup<FormType<Record<`check-${string}`, boolean>>>({});

  /**
   * @inheritdoc
   */
  public ngOnChanges(changes: TypedChanges<MultiSelectTableComponent>): void {
    if (changes.options && !isEqual(changes.options.currentValue, changes.options.previousValue)) {
      this.form = new FormGroup({});
      this.options?.forEach(option => this.form.addControl(`check-${option.key}`, new FormControl(option.selected, {nonNullable: true})));
    }
  }

  /**
   * Handles the click on a selection checkbox.
   *
   * @public
   * @param {MouseEvent} event
   * @param {number} index
   */
  public clickOnCheckbox(event: MouseEvent, index: number): void {
    this.click(event, index, !!this.form.controls[`check-${this.options[index]!.key}`]!.value);
  }

  /**
   * Handles the click on a selection row.
   *
   * @public
   * @param {MouseEvent} event
   * @param {number} index
   */
  public clickOnRow(event: MouseEvent, index: number): void {
    this.click(event, index, !this.form.controls[`check-${this.options[index]!.key}`]!.value);
  }

  /**
   * Emits the `confirm` event.
   *
   * @public
   */
  public emitConfirm(): void {
    this.confirm.emit(this.options.filter(option => this.form.controls[`check-${option.key}`]!.value).map(option => option.key));
  }

  /**
   * Handles the click to toggle an item selection.
   *
   * @private
   * @param {MouseEvent} event
   * @param {number} index
   * @param {boolean} value
   */
  private click(event: MouseEvent, index: number, value: boolean): void {
    event.stopPropagation();
    this.options[index]!.selected = value;
    this.form.controls[`check-${this.options[index]!.key}`]?.setValue(value);
    this.emitConfirm();
  }
}
