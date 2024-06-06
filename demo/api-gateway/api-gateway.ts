import * as apigateway from "@pulumi/aws-apigateway";
import bitpulumi from "@bitpulumi/awsx.lambda";

export function apiRoutes(endpointName: string) {
  const api = new apigateway.RestAPI(endpointName, {
    routes: [
      {
        path: "/api/date",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "date-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.date-lambda")
        ),
      },
      {
        path: "/api/dynamo",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "dynamo-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.dynamo-lambda")
        ),
      },
      {
        path: "/api/flights",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "flights-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.flights-lambda")
        ),
      },
      {
        path: "/api/hello",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "hello-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.hello-lambda"),
          {
            environment: {
              variables: { DATE_TYPE: "Today" }, // Optional environment variables
            },
          }
        ),
      },
      {
        path: "/api/random-number",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "random-number-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.random-number-lambda")
        ),
      },
      {
        path: "/api/success",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "success-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.success-lambda")
        ),
      }
    ],
  });
  return api;
}
