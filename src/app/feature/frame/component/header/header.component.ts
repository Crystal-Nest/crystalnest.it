import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { ContactButtonComponent } from '~cn/shared/component/button/contact-button/contact-button.component';
import { NavigationBarComponent } from '~cn/shared/component/navigation-bar/navigation-bar.component';
import { NavigationLinkComponent } from '~cn/shared/component/navigation-link/navigation-link.component';
import { SeparatorComponent } from '~cn/shared/component/separator/separator.component';

/**
 * Header component.
 *
 * @export
 * @class HeaderComponent
 * @typedef {HeaderComponent}
 */
@Component({
  selector: 'cn-header',
  standalone: true,
  imports: [RouterLink, ContactButtonComponent, SeparatorComponent, NavigationBarComponent, NavigationLinkComponent, MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly urlPrefix = 'https://raw.githubusercontent.com/crystal-nest/mod-fancy-assets/main/';
}
