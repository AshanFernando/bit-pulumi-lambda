import { APIGatewayProxyHandler } from 'aws-lambda';

    export const handler: APIGatewayProxyHandler = async () => {
      const message = "success!";
    
      return {
        statusCode: 200,
        body: JSON.stringify({ message }),
      };
    };    
