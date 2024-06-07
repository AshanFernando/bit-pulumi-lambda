import type {
  WebpackConfigMutator,
  WebpackConfigTransformer,
} from '@teambit/webpack';
import {
  configBaseFactory,
  configBaseProdFactory,
  templateWebpackConfigFactory,
} from '@teambit/react.webpack.react-webpack';
import { BundlerContext } from '@teambit/bundler';

export function createTemplateBundlerTransformers(context: BundlerContext) {
  const base = configBaseFactory(!context.development);
  const baseProd = configBaseProdFactory(context.development);
  const templateConfig = templateWebpackConfigFactory();

  const defaultTransformer: WebpackConfigTransformer = (
    configMutator: WebpackConfigMutator
  ) => {
    const merged = configMutator.merge([base, baseProd, templateConfig]);
    return merged;
  };

  return defaultTransformer;
}
