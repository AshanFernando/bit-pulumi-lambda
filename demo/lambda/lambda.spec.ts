import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as path from "path";
import bitpulumi from './lambda';

// Mock Pulumi and AWS SDK components
jest.mock("@pulumi/aws", () => ({
  iam: {
    Role: jest.fn().mockImplementation((name, args) => ({
      arn: `arn:aws:iam::123456789012:role/${name}`,
    })),
    RolePolicyAttachment: jest.fn().mockImplementation(() => ({})),
    ManagedPolicy: {
      AWSLambdaBasicExecutionRole: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    },
  },
  lambda: {
    Function: jest.fn().mockImplementation((name, args) => ({
      name,
      ...args,
    })),
    Runtime: {
      NodeJS18dX: "nodejs18.x",
    },
  },
}));

jest.mock("@pulumi/pulumi", () => ({
  asset: {
    AssetArchive: jest.fn(),
    FileArchive: jest.fn(),
  },
}));

// Mock path functions
jest.mock("path", () => ({
  dirname: jest.fn().mockReturnValue("/mocked/path"),
}));

describe("bitpulumi.awsx.lambda", () => {
  it("creates an AWS Lambda function with the correct properties", () => {
    const lambdaName = "testLambda";
    const lambdaCodeComponent = "/mocked/lambda/code/component";
    const lambdaArgs: Partial<aws.lambda.FunctionArgs> = {
      environment: {
        variables: { DATE_TYPE: "Today" },
      },
    };

    const lambdaInstance = new bitpulumi.awsx.Lambda(lambdaName, lambdaCodeComponent, lambdaArgs);

    expect(aws.iam.Role).toHaveBeenCalledWith(`${lambdaName}-role`, expect.any(Object));
    expect(aws.iam.RolePolicyAttachment).toHaveBeenCalledWith(`${lambdaName}-role-policy-attachment`, {
      role: expect.any(Object),
      policyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
    });
    expect(aws.lambda.Function).toHaveBeenCalledWith(lambdaName, expect.objectContaining({
      runtime: "nodejs18.x",
      handler: "index.handler",
      role: `arn:aws:iam::123456789012:role/${lambdaName}-role`,
      environment: {
        variables: { DATE_TYPE: "Today" },
      },
    }));
    expect(pulumi.asset.AssetArchive).toHaveBeenCalledWith({
      ".": expect.any(pulumi.asset.FileArchive),
    });
    expect(pulumi.asset.FileArchive).toHaveBeenCalledWith("/mocked/path");
  });
});
