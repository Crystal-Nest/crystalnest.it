import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {ModVersion} from '~cn/core/model/mod-version.type';

/**
 * GitHub GraphQL result of a query with nodes.
 *
 * @export
 * @interface QueryNodes
 * @typedef {QueryNodes}
 * @template T
 */
export interface QueryNodes<T> {
  /**
   * Total amount of nodes.  
   * Can differ from the amount of nodes retrieved as the latter is limited.
   *
   * @type {number}
   */
  totalCount: number;
  /**
   * Nodes.
   *
   * @type {T[]}
   */
  nodes: T[];
}

/**
 * GitHub GraphQL result of the query to retrieve a topic name.
 *
 * @export
 * @interface TopicQuery
 * @typedef {TopicQuery}
 */
export interface TopicQuery {
  /**
   * Topic wrapper with name.
   *
   * @type {{name: string}}
   */
  topic: {
    name: string;
  };
}

/**
 * GitHub GraphQL result of the query to retrieve a release name.
 *
 * @export
 * @interface ReleaseQuery
 * @typedef {ReleaseQuery}
 */
export interface ReleaseQuery {
  /**
   * Name.
   *
   * @type {`v${MinecraftVersion}-${ModVersion}`}
   */
  name: `v${MinecraftVersion}-${ModVersion}`;
}

/**
 * GitHub GraphQL result of the query to retrieve a Crystal Nest mod.
 *
 * @export
 * @interface RepositoryQuery
 * @typedef {RepositoryQuery}
 */
export interface RepositoryQuery {
  /**
   * Name.
   *
   * @type {string}
   */
  name: string;
  /**
   * Description field.
   *
   * @type {string}
   */
  description: string;
  /**
   * Whether the wiki is enabled.
   *
   * @type {boolean}
   */
  hasWikiEnabled: boolean;
  /**
   * Whether it's a template.
   *
   * @type {boolean}
   */
  isTemplate: boolean;
  /**
   * Topics.
   *
   * @type {QueryNodes<TopicQuery>}
   */
  repositoryTopics: QueryNodes<TopicQuery>;
  /**
   * Optional latest stable release name.
   *
   * @type {ReleaseQuery | null}
   */
  latestRelease: ReleaseQuery | null;
  /**
   * List with the latest release, regardless of whether it's stable or prerelease.
   *
   * @type {QueryNodes<ReleaseQuery>}
   */
  releases: QueryNodes<ReleaseQuery>;
  /**
   * Readme object.
   *
   * @type {{text: string}}
   */
  object: {
    text: string;
  };
}

/**
 * GitHub GraphQL result of the query to retrieve Crystal Nest mods.
 *
 * @export
 * @interface ModsQuery
 * @typedef {ModsQuery}
 */
export interface ModsQuery {
  /**
   * Root data object.
   *
   * @type {{organization: {repositories: QueryNodes<RepositoryQuery>}}}
   */
  data: {
    organization: {
      repositories: QueryNodes<RepositoryQuery>;
    };
  };
}
