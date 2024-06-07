import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

export const handler: APIGatewayProxyHandler = async (event) => {
  // Initialize the DynamoDB DocumentClient
  const docClient = new AWS.DynamoDB.DocumentClient();
  const countTable = process.env.COUNT_TABLE;
  const userIp = event.requestContext.identity.sourceIp;

  if (!countTable) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'COUNT_TABLE environment variable is not set!',
      }),
    };
  }

  if (!userIp) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'User IP address not found!' }),
    };
  }

  try {
    // Get the current count for the user IP
    const getResult = await docClient.get({
      TableName: countTable,
      Key: { sessionId: userIp },
    }).promise();

    let count = getResult.Item ? getResult.Item.count : 0;
    count += 1;

    // Update the count in the DynamoDB table
    await docClient.put({
      TableName: countTable,
      Item: { sessionId: userIp, count },
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ count }),
    };
  } catch (error) {
    console.error('Error accessing DynamoDB', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error accessing DynamoDB', error }),
    };
  }
};
