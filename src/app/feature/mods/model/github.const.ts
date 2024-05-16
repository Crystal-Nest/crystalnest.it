/* eslint-disable @typescript-eslint/naming-convention */
import {MinecraftVersion} from '~cn/feature/generator/model/minecraft-version.type';

export interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface Owner<T extends string = 'Crystal-Nest'> {
  login: T;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: '';
  url: `https://api.github.com/users/${T}`;
  html_url: `https://github.com/${T}`;
  followers_url: `${Owner<T>['url']}/followers`;
  following_url: `${Owner<T>['url']}/following{/other_user}`;
  gists_url: `${Owner<T>['url']}/gists{/gist_id}`;
  starred_url: `${Owner<T>['url']}/starred{/owner}{/repo}`;
  subscriptions_url: `${Owner<T>['url']}/subscriptions`;
  organizations_url: `${Owner<T>['url']}/orgs`;
  repos_url: `${Owner<T>['url']}/repos`;
  events_url: `${Owner<T>['url']}/events{/privacy}`;
  received_events_url: `${Owner<T>['url']}/received_events`;
  type: string;
  site_admin: boolean;
}

export interface Organization<T extends string = 'Crystal-Nest'> {
  login: T;
  id: number;
  node_id: string;
  url: `https://api.github.com/orgs/${T}`;
  repos_url: `${Organization<T>['url']}/repos`;
  events_url: `${Organization<T>['url']}/events`;
  hooks_url: `${Organization<T>['url']}/hooks`;
  issues_url: `${Organization<T>['url']}/issues`;
  members_url: `${Organization<T>['url']}/members{/member}`;
  public_members_url: `${Organization<T>['url']}/public_members{/member}`;
  avatar_url: string;
  description: string;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: string | null;
  twitter_username: string | null;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: `https://github.com/${T}`;
  created_at: string; // "2024-01-09T11:32:32Z"
  updated_at: string;
  archived_at: string | null;
  type: 'Organization';
}

export interface Repository<N extends string = string, O extends string = 'Crystal-Nest'> {
  id: number;
  node_id: string;
  name: N;
  full_name: `${O}/${N}`;
  private: false;
  owner: Owner<O>;
  html_url: `https://github.com/${O}/${N}`;
  description: string;
  fork: boolean;
  url: `https://api.github.com/repos/${O}/${N}`;
  forks_url: `${Repository<N, O>['url']}/forks`;
  keys_url: `${Repository<N, O>['url']}/keys{/key_id}`;
  collaborators_url: `${Repository<N, O>['url']}/collaborators{/collaborator}`;
  teams_url: `${Repository<N, O>['url']}/teams`;
  hooks_url: `${Repository<N, O>['url']}/hooks`;
  issue_events_url: `${Repository<N, O>['url']}/issues/events{/number}`;
  events_url: `${Repository<N, O>['url']}/events`;
  assignees_url: `${Repository<N, O>['url']}/assignees{/user}`;
  branches_url: `${Repository<N, O>['url']}/branches{/branch}`;
  tags_url: `${Repository<N, O>['url']}/tags`;
  blobs_url: `${Repository<N, O>['url']}/git/blobs{/sha}`;
  git_tags_url: `${Repository<N, O>['url']}/git/tags{/sha}`;
  git_refs_url: `${Repository<N, O>['url']}/git/refs{/sha}`;
  trees_url: `${Repository<N, O>['url']}/git/trees{/sha}`;
  statuses_url: `${Repository<N, O>['url']}/statuses/{sha}`;
  languages_url: `${Repository<N, O>['url']}/languages`;
  stargazers_url: `${Repository<N, O>['url']}/stargazers`;
  contributors_url: `${Repository<N, O>['url']}/contributors`;
  subscribers_url: `${Repository<N, O>['url']}/subscribers`;
  subscription_url: `${Repository<N, O>['url']}/subscription`;
  commits_url: `${Repository<N, O>['url']}/commits{/sha}`;
  git_commits_url: `${Repository<N, O>['url']}/git/commits{/sha}`;
  comments_url: `${Repository<N, O>['url']}/comments{/number}`;
  issue_comment_url: `${Repository<N, O>['url']}/issues/comments{/number}`;
  contents_url: `${Repository<N, O>['url']}/contents/{+path}`;
  compare_url: `${Repository<N, O>['url']}/compare/{base}...{head}`;
  merges_url: `${Repository<N, O>['url']}/merges`;
  archive_url: `${Repository<N, O>['url']}/{archive_format}{/ref}`;
  downloads_url: `${Repository<N, O>['url']}/downloads`;
  issues_url: `${Repository<N, O>['url']}/issues{/number}`;
  pulls_url: `${Repository<N, O>['url']}/pulls{/number}`;
  milestones_url: `${Repository<N, O>['url']}/milestones{/number}`;
  notifications_url: `${Repository<N, O>['url']}/notifications{?since,all,participating}`;
  labels_url: `${Repository<N, O>['url']}/labels{/name}`;
  releases_url: `${Repository<N, O>['url']}/releases{/id}`;
  deployments_url: `${Repository<N, O>['url']}/deployments`;
  created_at: string; // 2022-04-01T10:56:06Z
  updated_at: string;
  pushed_at: string;
  git_url: `git://github.com/${O}/${N}.git`;
  ssh_url: `git@github.com:${O}/${N}.git`;
  clone_url: `https://github.com/${O}/${N}.git`;
  svn_url: `https://github.com/${O}/${N}`;
  homepage: `https://modrinth.com/mod/${N}`;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: false;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: 'public';
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: MinecraftVersion;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
}

export interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: Owner<'Crystal-Nest' | 'Crystal-Spider' | 'MoonstoneWebber' | 'sZeta99'>;
  node_id: string;
  tag_name: string;
  target_commitish: MinecraftVersion;
  name: string;
  draft: false;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string;
    uploader: Owner<'Crystal-Nest' | 'Crystal-Spider' | 'MoonstoneWebber' | 'sZeta99'>;
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
  }[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface Readme {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: 'file';
  content: string;
  encoding: 'base64';
}
