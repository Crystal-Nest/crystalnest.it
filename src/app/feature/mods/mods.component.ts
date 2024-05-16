import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';

import {ModsFormComponent} from './component/mods-form/mods-form.component';
import {ModsForm} from './model/mods-form.interface';
import {ModsService} from './service/mods.service';

import {CardComponent} from '~cn/shared/component/card/card.component';

/**
 * Mods showcase.
 *
 * @export
 * @class ModsComponent
 * @typedef {ModsComponent}
 */
@Component({
  selector: 'cn-mods',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ModsFormComponent,
    CardComponent
  ],
  providers: [ModsService],
  templateUrl: './mods.component.html',
  styleUrl: './mods.component.scss'
})
export class ModsComponent {
  public readonly mods$: Observable<any[]> = of([]);// This.modsService.getMods(30, 1);

  /**
   * @constructor
   * @public
   * @param {ModsService} modsService
   */
  public constructor(private readonly modsService: ModsService) {
    // This.modsService.getMods(5, 1).subscribe(console.log);
  }

  public search(form: ModsForm) {
    console.log(form);
  }
}
