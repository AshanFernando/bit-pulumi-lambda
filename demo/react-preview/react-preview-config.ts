import { DevServer, Bundler } from '@teambit/bundler';
import { EnvPreviewConfig } from '@teambit/preview';

export type ReactPreviewOptions = {
  /**
   * name of the react preview.
   */
  name?: string;

  /**
   * configuration for the preview.
   */
  previewConfig?: EnvPreviewConfig;

  /**
   * dependencies that will bundled as part of the env template and will configured as externals for the component bundle
   * these dependencies will be available in the preview on the window.
   * these dependencies will have only one instance on the page.
   */
  hostDependencies?: string[];

  /**
   * template for the docs readme section.
   */
  docsTemplate?: string;

  /**
   * DOM mounter for the component preview.
   */
  mounter?: string;

  /**
   * DOM mounter used for the thumbnail.
   */
  thumbnail?: string;

  /**
   * webpack config. consider type.
   */
  transformers?: any;

  /**
   * bundler to be used for the preview.
   */
  bundler?: Bundler;

  /**
   * dev server to use for preview.
   */
  devServer?: DevServer;

  /**
   * path to load the webpack instance from
   */
  webpackModulePath?: string;

  /**
   * path to load the webpack dev server instance from.
   */
  webpackDevServerModulePath?: string;
};
