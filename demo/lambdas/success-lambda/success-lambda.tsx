import { APIGatewayProxyHandler } from 'aws-lambda';

    export const handler: APIGatewayProxyHandler = async () => {
      const message = "Welcome to the API!";
    
      return {
        statusCode: 200,
        body: JSON.stringify({ message }),
      };
    };    
