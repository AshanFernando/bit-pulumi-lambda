import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './random-number-lambda';
import { version as uuidVersion } from 'uuid';

describe('Lambda Handler', () => {
  it('should return a 200 status code and a valid UUID', async () => {
    // Mock event, context, and callback
    const event = {} as any;
    const context = {} as any;
    const callback = () => {};

    // Call the handler
    const result = await handler(event, context, callback) as APIGatewayProxyResult;

    // Parse the body to check the message
    const body = JSON.parse(result.body);

    // Assertions
    expect(result.statusCode).toBe(200);
    expect(uuidVersion(body.message)).toBe(4);
  });
});
