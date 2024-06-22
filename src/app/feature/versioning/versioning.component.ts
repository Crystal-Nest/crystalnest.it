import {Component} from '@angular/core';
import {MarkdownModule} from 'ngx-markdown';

import {SectionComponent} from '~cn/shared/component/text/section/section.component';

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
  imports: [MarkdownModule, SectionComponent],
  templateUrl: './versioning.component.html',
  styleUrl: './versioning.component.scss'
})
export class VersioningComponent {
  public readonly xmlMavenPackageSnippet = '```xml\n<dependency>\n  <groupId>it.crystalnest</groupId>\n  <artifactId>cobweb-fabric</artifactId>\n  <version>1.20.4-1.0.0</version>\n</dependency>\n```';
}
