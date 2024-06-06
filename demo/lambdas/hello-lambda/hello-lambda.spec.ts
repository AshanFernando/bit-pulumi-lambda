// hello-service.spec.ts

import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './hello-lambda';
import { format } from 'date-fns';

describe('Lambda Handler', () => {
  it('should return a formatted message with the current date', async () => {
    // Get the expected date
    const expectedDate = format(new Date(), 'yyyy-MM-dd');

    // Expected message
    const expectedMessage = `Hey!, today is ${expectedDate}`;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });
});
