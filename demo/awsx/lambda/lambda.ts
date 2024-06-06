import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as path from "path";

namespace bitpulumi {
  export namespace awsx {
    export class Lambda extends aws.lambda.Function {
      constructor(lambdaName: string, lambdaCodeComponent: string, args: Partial<aws.lambda.FunctionArgs> = {}) {
        const {
          runtime = aws.lambda.Runtime.NodeJS18dX,
          handler = "index.handler",
          ...restArgs
        } = args;

        const lambdaRole = Lambda.createLambdaRole(`${lambdaName}-role`);
        const distDirPath = path.dirname(lambdaCodeComponent);

        super(lambdaName, {
          runtime: runtime,
          code: new pulumi.asset.AssetArchive({
            ".": new pulumi.asset.FileArchive(distDirPath),
          }),
          handler: handler,
          role: lambdaRole.arn,
          ...restArgs,
        });
      }

      private static createLambdaRole(roleName: string, tableName?: string): aws.iam.Role {
        const lambdaRole = new aws.iam.Role(roleName, {
          assumeRolePolicy: {
            Version: "2012-10-17",
            Statement: [{
              Action: "sts:AssumeRole",
              Effect: "Allow",
              Principal: {
                Service: "lambda.amazonaws.com",
              },
            }],
          },
        });

        const policyStatements: aws.iam.PolicyDocument = {
          Version: "2012-10-17",
          Statement: [
            {
              Effect: "Allow",
              Action: [
                "dynamodb:GetItem",
                "dynamodb:PutItem"
              ],
              Resource: "*"
            },
            {
              Effect: "Allow",
              Action: [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
              ],
              Resource: "arn:aws:logs:*:*:*"
            }
          ]
        };

        const policy = new aws.iam.Policy(`${roleName}-policy`, {
          policy: policyStatements
        });

        new aws.iam.RolePolicyAttachment(`${roleName}-policy-attachment`, {
          role: lambdaRole,
          policyArn: policy.arn,
        });

        return lambdaRole;
      }
    }
  }
}

export default bitpulumi;
