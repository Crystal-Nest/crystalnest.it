import {JSZipObject} from '@progress/jszip-esm';

import {TemplateProcessor} from './template-processor.class';

/**
 * Specializes the configuration-free Cobweb 2.0.0 templates for Minecraft 26.x.
 */
export class TemplateProcessor26 extends TemplateProcessor {
  /**
   * @inheritdoc
   */
  protected override handle(entry: JSZipObject, path: string): boolean {
    const relative = path.slice(this.root.length + 1);
    const files = [
      'build.gradle',
      'settings.gradle',
      'gradle.properties',
      'README.md',
      'common/build.gradle',
      'buildSrc/src/main/groovy/multiloader-common.gradle'
    ];
    if (files.includes(relative) || relative.endsWith('fabric.mod.json') || relative.endsWith('neoforge.mods.toml')) {
      this.writeText(this.process(path, this.rootChange), entry.async('string').then(text => this.processFile(this.process(text), relative)));
      return true;
    }
    return false;
  }

  /**
   * @inheritdoc
   */
  protected override processReadme(text: string): string {
    const value = super.processReadme(text);
    const labels = this.form.loaders.map(loader => loader === 'neoforge' ? 'NeoForge' : 'Fabric');
    return value.replace(/^!\[Loader\].*$/m, line => this.loaderBadges(line, labels));
  }

  /**
   * Transforms files owned by the 26.x template layout.
   *
   * @param {string} text normalized source.
   * @param {string} path path relative to the archive root.
   * @returns {string} generated file content.
   */
  private processFile(text: string, path: string): string {
    switch (path) {
      case 'build.gradle':
        return this.processRootGradle(text);
      case 'settings.gradle':
        return this.processSettings(text);
      case 'gradle.properties':
        return this.processVersionProperties(text);
      case 'README.md':
        return this.processReadme(text);
      case 'common/build.gradle':
        return this.processCommonGradle(text);
      case 'buildSrc/src/main/groovy/multiloader-common.gradle':
        return this.processConvention(text);
      default:
        if (path.endsWith('fabric.mod.json')) {
          const metadata = JSON.parse(text) as {contact: {homepage: string}};
          metadata.contact.homepage = this.homepage();
          return `${JSON.stringify(metadata, null, 2)}\n`;
        }
        return this.platforms.includes('modrinth') ? text : text.replace(/^(\s*)updateJSONURL/gm, '$1#updateJSONURL');
    }
  }

  /**
   * Removes project-specific analysis and unneeded plugin declarations.
   *
   * @param {string} text root build script.
   * @returns {string} generated build script.
   */
  private processRootGradle(text: string): string {
    let value = text;
    if (this.othersMod) {
      value = this.removeBlock(value, 'sonar');
      value = value.replace(/^ +id "org\.sonarqube"[^\n]*\n/m, '');
    }
    if (this.excludedLoaders.includes('fabric')) {
      value = value.replace(/^ +id "net\.fabricmc\.fabric-loom"[^\n]*\n/m, '').replace(/^ +\/\/ https:\/\/fabricmc\.net\/develop\/\n/m, '');
    }
    if (!this.hasModPublishing()) {
      value = value.replace(/^ +id "com\.hypherionmc\.modutils\.modpublisher"[^\n]*\n/m, '');
    }
    return value;
  }

  /**
   * Retains the common ModDev setup even for Fabric-only projects.
   *
   * @param {string} text settings script.
   * @returns {string} settings for the selected loaders.
   */
  private processSettings(text: string): string {
    let value = this.process(text, this.modIdKebabChange);
    for (const loader of this.excludedLoaders) {
      value = value.replace(new RegExp(`^include\\("${loader}"\\)\\n`, 'm'), '');
    }
    if (this.excludedLoaders.includes('fabric')) {
      value = value.replace(/^ +maven \{ url "https:\/\/maven\.fabricmc\.net" \}\n/m, '');
    }
    return value;
  }

  /**
   * Updates project properties and removes excluded component settings.
   *
   * @param {string} text project properties.
   * @returns {string} generated properties.
   */
  private processVersionProperties(text: string): string {
    let value = this.processProperties(text);
    for (const property of this.excludedProperties()) {
      value = value.replace(new RegExp(`^${property}\\s*=.*\\n`, 'm'), '');
    }
    for (const loader of this.excludedLoaders) {
      value = value.replace(new RegExp(`^# ${loader}[^\\n]*\\n\\n?`, 'im'), '');
    }
    return value.replace(/\n{3,}/g, '\n\n');
  }

  /**
   * Removes disabled publication task lookups whose platforms were omitted.
   *
   * @param {string} text common module build script.
   * @returns {string} generated module build script.
   */
  private processCommonGradle(text: string): string {
    const tasks: Record<string, string> = {
      github: 'publishGitHub',
      modrinth: 'publishModrinth',
      curseforge: 'publishCurseforge'
    };
    let value = text;
    for (const platform of this.excludedPlatforms) {
      if (tasks[platform]) {
        value = value.replace(new RegExp(`^tasks\\.named\\("${tasks[platform]}"\\)[^\\n]*\\n`, 'm'), '');
      }
    }
    return value;
  }

  /**
   * Keeps publication configuration consistent with properties and task dependencies.
   *
   * @param {string} text shared convention plugin.
   * @returns {string} generated convention plugin.
   */
  private processConvention(text: string): string {
    let value = this.process(text, this.licenseChange);
    for (const property of this.excludedProperties()) {
      value = value.replace(new RegExp(`^ +"${property}"[^\\n]*\\n`, 'm'), '');
    }
    for (const loader of this.excludedLoaders.filter(excluded => excluded !== 'forge')) {
      const label = loader === 'neoforge' ? 'NeoForge' : 'Fabric';
      for (const name of [loader, label]) {
        value = value.replace(new RegExp(`^([ \\t]*)case "${name}":\\n[\\s\\S]*?^\\1  break\\n?`, 'gm'), '');
      }
      if (loader === 'fabric' || loader === 'neoforge') {
        value = value.replace(loader === 'fabric' ? /, "fabric\.mod\.json"/ : /, "META-INF\/neoforge\.mods\.toml"/, '');
      }
    }
    if (!this.platforms.includes('maven')) {
      value = this.removeBlock(value, 'publishing');
      value = value.replace(/^ +id "maven-publish"\n/m, '').replace(/^ +dependsOn "publish"\n/m, '');
    }
    if (this.hasModPublishing()) {
      value = this.removePublishingDestinations(value);
    } else {
      value = this.removeBlock(value, 'publisher');
      value = value.replace(/^ +id "com\.hypherionmc\.modutils\.modpublisher"\n/m, '').replace(/^ +dependsOn "publishMod"\n/m, '');
    }
    return this.processMetadataExpansion(value);
  }

  /**
   * Configures escaping for JSON, TOML basic strings and the literal TOML description.
   *
   * @param {string} text shared convention plugin.
   * @returns {string} convention retaining native multiline descriptions and escaping other metadata values.
   */
  private processMetadataExpansion(text: string): string {
    const value = text.replace('    expand expandProps', `    def isToml = name.endsWith(".toml")
    def json = new JsonGenerator.Options()
      .disableUnicodeEscaping()
      .build()
    expand expandProps.collectEntries { key, value ->
      if (value instanceof CharSequence) {
        def text = value.toString()
        if (isToml) {
          if (key == "description") {
            text = text.replace("'''", "\`\`\`")
          } else {
            text = text
              .replace("\\\\", "\\\\\\\\")
              .replace("\\"", "\\\\\\"")
              .replace("\\b", "\\\\b")
              .replace("\\t", "\\\\t")
              .replace("\\n", "\\\\n")
              .replace("\\f", "\\\\f")
              .replace("\\r", "\\\\r")
              .replaceAll(/[\\x00-\\x1f\\x7f]/) { character -> String.format("\\\\u%04x", (int) character.charAt(0)) }
          }
        } else {
          def quoted = json.toJson(text)
          text = quoted.substring(1, quoted.length() - 1)
        }
        return [(key): text]
      }
      return [(key): value]
    }`);
    return `import groovy.json.JsonGenerator\n\n${value}`;
  }

  /**
   * Removes only the omitted publishing sections and their associated options.
   *
   * @param {string} text shared convention.
   * @returns {string} convention with the selected destinations.
   */
  private removePublishingDestinations(text: string): string {
    let value = text;
    if (!this.platforms.includes('github')) {
      value = this.removeBlock(value, 'github');
      value = value.replace(/^ +github System\.getenv[^\n]*\n/m, '');
    }
    if (!this.platforms.includes('modrinth')) {
      value = this.removeBlock(value, 'modrinthDepends');
      value = value.replace(/^ +(?:modrinth System\.getenv|setModrinthID)[^\n]*\n/gm, '');
    }
    if (!this.platforms.includes('curseforge')) {
      value = this.removeBlock(value, 'curseDepends');
      value = value.replace(/^ +(?:curseforge System\.getenv|setCurseID|setCurseEnvironment)[^\n]*\n/gm, '');
    }
    return value;
  }

  /**
   * Rebuilds loader badges without orphaned separator images.
   *
   * @param {string} line original badge line.
   * @param {string[]} labels selected loader labels.
   * @returns {string} filtered badge line.
   */
  private loaderBadges(line: string, labels: string[]): string {
    const header = line.match(/^!\[Loader\]\([^)]*\)/)?.[0] ?? '';
    const separator = line.match(/!\[Separator\]\([^)]*\)/)?.[0] ?? '';
    const badges = line.match(/\[!\[[^\]]*\]\([^)]*\)\]\([^)]*\)/g) ?? [];
    return header + badges.filter(badge => labels.some(label => badge.startsWith(`[![${label}]`))).join(separator);
  }

  /**
   * Lists property keys whose settings and expansion entries must be removed together.
   *
   * @returns {string[]} omitted property keys.
   */
  private excludedProperties(): string[] {
    const properties: string[] = [];
    if (this.excludedLoaders.includes('fabric')) {
      properties.push('fabric_version', 'fabric_loader_version');
    }
    if (this.excludedLoaders.includes('neoforge')) {
      properties.push('neoforge_version', 'neoforge_min_version');
    }
    if (!this.platforms.includes('curseforge')) {
      properties.push('curseforge_id');
    }
    return properties;
  }

  /**
   * Reports whether a non-Maven publishing plugin is needed.
   *
   * @returns {boolean} whether a mod-hosting destination is selected.
   */
  private hasModPublishing(): boolean {
    return this.platforms.some(platform => platform !== 'maven');
  }

  /**
   * Removes one known, consistently indented CMT Gradle block.
   *
   * @param {string} text source convention.
   * @param {string} header block header.
   * @returns {string} source without that block.
   * @throws {Error} when the template no longer contains exactly one matching block.
   */
  private removeBlock(text: string, header: string): string {
    const escaped = header.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`^([ \\t]*)${escaped} \\{\\n[\\s\\S]*?^\\1\\}\\n?`, 'gm');
    if ([...text.matchAll(pattern)].length === 1) {
      return text.replace(pattern, '');
    }
    throw new Error(`The template must contain exactly one ${header} block.`);
  }
}
