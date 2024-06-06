import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
  const countTable = process.env.COUNT_TABLE;
  const userIp = event.requestContext.identity.sourceIp;

  if (!countTable) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'COUNT_TABLE environment variable is not set',
      }),
    };
  }

  if (!userIp) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User IP address not found' }),
    };
  }

  // Get the current count for the user IP
  const getResult = await ddbDocClient.send(
    new GetCommand({
      TableName: countTable,
      Key: { sessionId: userIp },
    })
  );

  let count = getResult.Item ? getResult.Item.count : 0;
  count += 1;

  // Update the count in the DynamoDB table
  await ddbDocClient.send(
    new PutCommand({
      TableName: countTable,
      Item: { sessionId: userIp, count },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ count }),
  };
};
