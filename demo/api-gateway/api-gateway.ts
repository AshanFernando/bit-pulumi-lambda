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
          require.resolve("@bit-pulumi-lambda/demo.lambdas.date-lambda"),
          {
            environment: {
              variables: { DATE_TYPE: "today" }, // Optional environment variables
            },
          }
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
          require.resolve("@bit-pulumi-lambda/demo.lambdas.hello-lambda")
        ),
      },
      {
        path: "/api/random",
        method: "GET",
        eventHandler: new bitpulumi.awsx.Lambda(
          "random-lambda",
          require.resolve("@bit-pulumi-lambda/demo.lambdas.random-lambda")
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
