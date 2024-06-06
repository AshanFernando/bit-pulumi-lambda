import { PulumiApp } from '@bitpulumi/development.app-types.pulumi';
import * as pulumi from "@pulumi/pulumi";
import { apiRoutes } from "@bit-pulumi-lambda/demo.api-gateway";
import { countTable } from "@bit-pulumi-lambda/demo.dynamodb.count-table"

const API_NAME = "api";

const apiRouteInstance = apiRoutes(API_NAME);

export const apiUrl = apiRouteInstance.url.apply(
  (url) => `${url}api`
) as pulumi.Output<string>;

export const countTableName = countTable.name;

/**
 * load the application to Bit.
 */
export default new PulumiApp();