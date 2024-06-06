import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk';

AWS.config.update({ region: 'your-region' }); // Specify your region here
const dynamoDb = new AWS.DynamoDB.DocumentClient();

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
  const getParams = {
    TableName: countTable,
    Key: { sessionId: userIp },
  };

  let count = 0;
  try {
    const getResult = await dynamoDb.get(getParams).promise();
    if (getResult.Item) {
      count = getResult.Item.count;
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error retrieving count', error }),
    };
  }

  count += 1;

  // Update the count in the DynamoDB table
  const putParams = {
    TableName: countTable,
    Item: { sessionId: userIp, count },
  };

  try {
    await dynamoDb.put(putParams).promise();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error updating count', error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ count }),
  };
};
