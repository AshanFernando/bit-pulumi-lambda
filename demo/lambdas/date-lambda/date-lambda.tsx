import { APIGatewayProxyHandler } from 'aws-lambda';
import { dateUtil } from '@bit-pulumi-lambda/demo.utils.date-util'

export const handler: APIGatewayProxyHandler = async () => {
  const dateType = process.env.DATE_TYPE || "";
  const message = `Hey!, ${dateType} is ${dateUtil(dateType)}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
