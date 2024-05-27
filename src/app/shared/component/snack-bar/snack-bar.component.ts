import {HttpErrorResponse} from '@angular/common/http';
import {Component, Inject, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from '@angular/material/snack-bar';

/**
 * Crystal Nest snackbar component.
 *
 * @export
 * @class SnackBarComponent
 * @typedef {SnackBarComponent}
 */
@Component({
  selector: 'cn-snack-bar',
  standalone: true,
  imports: [MatSnackBarModule, MatButtonModule, MatIconModule],
  templateUrl: './snack-bar.component.html',
  styleUrl: './snack-bar.component.scss'
})
export class SnackBarComponent {
  /**
   * Snack Bar reference.
   *
   * @public
   * @readonly
   * @type {MatSnackBarRef<any>}
   */
  public readonly snackBarRef = inject(MatSnackBarRef);

  /**
   * @constructor
   * @public
   * @param {HttpErrorResponse} data
   */
  public constructor(@Inject(MAT_SNACK_BAR_DATA) public readonly data: HttpErrorResponse) {}
}
