import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';

import {CrystalNestIcon} from '~cn/core/model/icon-repository.const';
import {ContactButtonComponent} from '~cn/shared/component/button/contact-button/contact-button.component';
import {LinkComponent} from '~cn/shared/component/link/link.component';
import {NavbarComponent, NavbarLink} from '~cn/shared/component/navbar/navbar.component';

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
  imports: [
    RouterLink,
    ContactButtonComponent,
    MatDividerModule,
    NavbarComponent,
    LinkComponent,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly links: NavbarLink[] = [
    {
      to: '/',
      icon: {name: '/assets/images/home.png'},
      left: true
    },
    {
      to: 'https://github.com/crystal-nest',
      icon: {name: CrystalNestIcon.platformIcon.github}
    },
    {
      to: 'https://modrinth.com/user/CrystalSpider',
      icon: {name: CrystalNestIcon.platformIcon.modrinth}
    },
    {
      to: 'https://www.curseforge.com/members/crystal_spider_/projects',
      icon: {name: CrystalNestIcon.platformIcon.curseforge}
    },
    {
      to: 'https://www.patreon.com/crystalspider',
      icon: {name: CrystalNestIcon.platformIcon.patreon}
    },
    {
      to: 'https://ko-fi.com/crystalspider',
      icon: {name: CrystalNestIcon.platformIcon.kofi}
    }
  ];
}
