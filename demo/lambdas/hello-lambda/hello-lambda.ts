import { APIGatewayProxyHandler } from 'aws-lambda';
import { dateUtil } from '@bit-pulumi-lambda/demo.utils.date-util'

export const handler: APIGatewayProxyHandler = async () => {
  const message = `Hey!, today is ${dateUtil('today')}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
