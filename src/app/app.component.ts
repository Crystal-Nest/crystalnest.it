import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';

import {FrameComponent} from '~cn/feature/frame/frame.component';

/**
 * App component.
 *
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'cn-root',
  standalone: true,
  imports: [RouterOutlet, FrameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public constructor(private readonly matIconRegistry: MatIconRegistry, private readonly sanitizer: DomSanitizer) {
    this.registerSvgIcon('client');
    this.registerSvgIcon('server');
    this.registerSvgIcon('client-server');
    this.registerSvgIcon('fabric');
    this.registerSvgIcon('forge');
    this.registerSvgIcon('neoforge');
  }

  private registerSvgIcon(icon: string) {
    this.matIconRegistry.addSvgIcon(icon, this.sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon}.svg`));
  }
}
