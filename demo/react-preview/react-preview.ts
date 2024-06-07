import objectHash from 'object-hash';
import {
  Bundler,
  BundlerContext,
  DevServer,
  DevServerContext,
} from '@teambit/bundler';
// Make sure bit recognizes the dependencies
import 'webpack-dev-server';
import 'webpack';
import { WebpackBundler } from '@teambit/webpack.webpack-bundler';
import { WebpackDevServer } from '@teambit/webpack.webpack-dev-server';
import { EnvContext, EnvHandler } from '@teambit/envs';
import { EnvPreviewConfig, Preview } from '@teambit/preview';
import { WebpackConfigTransformer } from '@teambit/webpack';
import { Workspace } from '@teambit/workspace';
import { createDevServerTransformers } from './dev-server-transformer';
import { ReactPreviewOptions } from './react-preview-config';
import { createBundlerTransformers } from './bundler-transformers';
import { createTemplateBundlerTransformers } from './template-transformers';

export class ReactPreview implements Preview {
  constructor(
    readonly name: string,
    protected mounter: string = require.resolve('./mounter'),
    protected docsTemplate: string = require.resolve('./docs'),
    protected previewConfig: EnvPreviewConfig = {},
    protected transformers: WebpackConfigTransformer[] = [],
    protected workspace: Workspace,
    protected hostDependencies?: string[],
    protected devServer?: DevServer,
    protected bundler?: Bundler,
    protected webpackModulePath: string = require.resolve('webpack'),
    protected webpackDevServerModulePath: string = require.resolve(
      'webpack-dev-server'
    )
  ) {}

  /**
   * Default host dependencies for the react preview.
   */
  static hostDependencies = [
    '@teambit/mdx.ui.mdx-scope-context',
    '@mdx-js/react',
    'react',
    'react-dom',
  ];

  getDevServer(context: DevServerContext): EnvHandler<DevServer> {
    if (this.devServer) return () => this.devServer!;
    return WebpackDevServer.from({
      webpackModulePath: this.webpackModulePath,
      webpackDevServerModulePath: this.webpackDevServerModulePath,
      devServerContext: context,
      transformers: [
        createDevServerTransformers(context, this.workspace),
        ...this.transformers,
      ],
    });
  }

  getDevEnvId(): string {
    const objToHash = {
      webpack: this.webpackModulePath,
      webpackDevServer: this.webpackDevServerModulePath,
      transformers: this.transformers,
    };
    const devEnvId = objectHash(objToHash);
    return devEnvId;
  }

  getBundler(context: BundlerContext): EnvHandler<Bundler> {
    if (this.bundler) return () => this.bundler!;
    return WebpackBundler.from({
      targets: [],
      transformers: [createBundlerTransformers(context), ...this.transformers],
      bundlerContext: context,
      webpackModulePath: this.webpackModulePath,
    });
  }

  getTemplateBundler(context: BundlerContext): EnvHandler<Bundler> {
    const bundler = WebpackBundler.from({
      targets: context.targets,
      transformers: [
        createTemplateBundlerTransformers(context),
        ...this.transformers,
      ],
      bundlerContext: context,
      webpackModulePath: this.webpackModulePath,
    });
    return bundler;
  }

  getHostDependencies(): string[] {
    return this.hostDependencies || ReactPreview.hostDependencies;
  }

  getMounter(): string {
    return this.mounter;
  }

  getDocsTemplate(): string {
    return this.docsTemplate;
  }

  getPreviewConfig(): EnvPreviewConfig {
    return {
      strategyName: 'component',
      splitComponentBundle: true,
      // isScaling: true,
      ...this.previewConfig,
    };
  }

  static from(options: ReactPreviewOptions): EnvHandler<ReactPreview> {
    const name = options.name || 'react-preview';
    return (context: EnvContext) => {
      let workspace;
      try {
        workspace = context.getAspect<any>('teambit.workspace/workspace');
      } catch {
        // ignore - this happen usually when loading the env from a scope when you want to use a workspace template
      }
      return new ReactPreview(
        name,
        options.mounter,
        options.docsTemplate,
        options.previewConfig,
        options.transformers,
        workspace,
        options.hostDependencies,
        options.devServer,
        options.bundler,
        options.webpackModulePath,
        options.webpackDevServerModulePath
      );
    };
  }
}
