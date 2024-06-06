import { APIGatewayProxyHandler } from 'aws-lambda';
import { format } from 'date-fns';

export const handler: APIGatewayProxyHandler = async () => {
  const dateType = process.env.DATE_TYPE;
  const message = `Hey!, ${dateType} is ${format(new Date(), "yyyy-MM-dd")}`;

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
};
