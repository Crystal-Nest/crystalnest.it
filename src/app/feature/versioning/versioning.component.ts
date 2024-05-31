import {Component} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MarkdownModule} from 'ngx-markdown';

/**
 * Versioning page.
 *
 * @export
 * @class VersioningComponent
 * @typedef {VersioningComponent}
 */
@Component({
  selector: 'cn-versioning',
  standalone: true,
  imports: [
    RouterModule,
    MarkdownModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './versioning.component.html',
  styleUrl: './versioning.component.scss'
})
export class VersioningComponent {
  public readonly xmlMavenPackageSnippet = '```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```';
}
