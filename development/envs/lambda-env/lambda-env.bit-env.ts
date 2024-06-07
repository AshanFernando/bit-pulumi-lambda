import { NodeEnv } from "@teambit/node.node";
import { Compiler } from "@teambit/compiler";
import { EnvHandler } from "@teambit/envs";
import { TemplateList } from '@teambit/generator';
import { AwsLambdaComponentTemplate } from '@bitpulumi/development.generators.aws-lambda';

import {
  EsbuildCompiler,
  EsbuildTask,
} from "@teambit/compilation.esbuild-compiler";
import fs from "fs";
import { Pipeline } from "@teambit/builder";
import type { Preview } from '@teambit/preview';
import { ReactPreview } from '@bitpulumi/development.envs.preview.react-preview';

export class LambdaEnv extends NodeEnv {
  /* shorthand name for the environment */
  name = "lambda-env";

  /**
   * the path to the esbuild config file.
   */
  protected esbuildConfigPath = require.resolve("./config/esbuild.config.json");

  /* the compiler to use during development */
  compiler(): EnvHandler<Compiler> {
    const esbuildOptions = JSON.parse(
      fs.readFileSync(this.esbuildConfigPath, "utf8")
    );

    return EsbuildCompiler.from(esbuildOptions, esbuildOptions);
  }

  generators() {
    return TemplateList.from([AwsLambdaComponentTemplate.from()]);
  }

  /**
   * a set of processes to be performed before a component is snapped, during its build phase
   */
  build() {
    const esbuildOptions = JSON.parse(
      fs.readFileSync(this.esbuildConfigPath, "utf8")
    );
    return Pipeline.from([
      EsbuildTask.from(esbuildOptions, esbuildOptions)
    ]);
  }

  preview(): EnvHandler<Preview> {
        return ReactPreview.from({
      /**
       * override the default docs template for components.
       */
      // docsTemplate: require.resolve('./preview/docs'),
      /**
       * mounters are used to mount components to DOM
       * during preview. use them for wrapping your components
       * with routing, theming, data fetching or other types
       * of providers.
       */
      bundler: undefined,
      previewConfig: {
        splitComponentBundle: false,
        strategyName: 'component'
      },
      // webpackModulePath: require.resolve("webpack"),
      // webpackDevServerModulePath: require.resolve("webpack-dev-server")
      // transformers: [webpackTransformer],
    });
  }
}

export default new LambdaEnv();
