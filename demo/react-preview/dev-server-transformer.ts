import type {
  WebpackConfigMutator,
  WebpackConfigTransformer,
} from '@teambit/webpack';
import { Workspace } from '@teambit/workspace';
import {
  configBaseFactory,
  configBaseDevFactory,
  configEnvDevFactory,
  configComponentDevFactory,
} from '@teambit/react.webpack.react-webpack';
import { DevServerContext } from '@teambit/bundler';

export function createDevServerTransformers(
  context: DevServerContext,
  workspace: Workspace
) {
  const baseConfig = configBaseFactory(false);
  const baseDevConfig = configBaseDevFactory({
    workspaceDir: workspace.path,
  });
  const envDevConfig = configEnvDevFactory({ envId: context.id });
  const componentDevConfig = configComponentDevFactory({
    envId: context.id,
    componentPathsRegExps: workspace?.getComponentPathsRegExps() ?? [],
  });

  const defaultTransformer: WebpackConfigTransformer = (
    configMutator: WebpackConfigMutator
  ) => {
    const merged = configMutator.merge([
      baseConfig,
      baseDevConfig,
      envDevConfig,
      componentDevConfig,
    ]);
    return merged;
  };

  return defaultTransformer;
}
