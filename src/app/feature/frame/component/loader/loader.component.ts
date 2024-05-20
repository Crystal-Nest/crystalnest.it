import {Component, Input} from '@angular/core';
import {MatProgressBarModule, ProgressBarMode} from '@angular/material/progress-bar';

/**
 * Loader component.
 *
 * @export
 * @class LoaderComponent
 * @typedef {LoaderComponent}
 */
@Component({
  selector: 'cn-loader',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input({required: true})
  public loading!: boolean | null;

  @Input({transform: (value: ProgressBarMode | null) => value ?? 'indeterminate'})
  public progressMode: ProgressBarMode = 'indeterminate';

  @Input({transform: (value: number | null) => value ?? -1})
  public progress = -1;
}
