import {MinecraftVersion} from '~cn/core/model/minecraft-version.type';
import {ModVersion} from '~cn/core/model/mod-version.type';

export interface QueryNodes<T> {
  totalCount: number;
  nodes: T[];
}

export interface TopicQuery {
  topic: {
    name: string;
  };
}

export interface ReleaseQuery {
  name: `v${MinecraftVersion}-${ModVersion}`;
}

export interface RepositoryQuery {
  name: string;
  description: string;
  hasWikiEnabled: boolean;
  isTemplate: boolean;
  repositoryTopics: QueryNodes<TopicQuery>;
  latestRelease: ReleaseQuery | null;
  releases: QueryNodes<ReleaseQuery>;
  object: {
    text: string;
  };
}

export interface ModsQuery {
  data: {
    organization: {
      repositories: QueryNodes<RepositoryQuery>;
    };
  };
}
