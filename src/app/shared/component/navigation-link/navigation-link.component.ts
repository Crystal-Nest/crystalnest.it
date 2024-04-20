import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

/**
 * Navigation link component.
 *
 * @export
 * @class NavigationLinkComponent
 * @typedef {NavigationLinkComponent}
 */
@Component({
  selector: 'cn-navigation-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation-link.component.html',
  styleUrl: './navigation-link.component.scss'
})
export class NavigationLinkComponent {
  @Input({required: true})
  public to!: string;

  @Input()
  public text?: string;

  @Input()
  public remote?: boolean;
}
