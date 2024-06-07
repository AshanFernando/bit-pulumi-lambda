import type {
  WebpackConfigMutator,
  WebpackConfigTransformer,
} from '@teambit/webpack';
import {
  configBaseFactory,
  configComponentProdFactory,
} from '@teambit/react.webpack.react-webpack';
import { BundlerContext } from '@teambit/bundler';

export function createBundlerTransformers(context: BundlerContext) {
  const baseConfig = configBaseFactory(!context.development);
  const componentConfig = configComponentProdFactory();

  const defaultTransformer: WebpackConfigTransformer = (
    configMutator: WebpackConfigMutator
  ) => {
    const merged = configMutator.merge([baseConfig, componentConfig]);
    return merged;
  };

  return defaultTransformer;
}
