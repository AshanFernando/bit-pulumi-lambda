import { APIGatewayProxyHandler } from 'aws-lambda';

import { randomUtil } from '@bit-pulumi-lambda/demo.utils.random-util';
export const handler: APIGatewayProxyHandler = async () => {
  const message = randomUtil();

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
