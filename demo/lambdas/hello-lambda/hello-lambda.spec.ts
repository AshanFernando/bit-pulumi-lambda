// hello-service.spec.ts

import { APIGatewayProxyHandler } from 'aws-lambda';
import { handler } from './hello-lambda';
import { format } from 'date-fns';

describe('Lambda Handler', () => {
  it('should return a formatted message with the current date', async () => {
    // Mock the environment variable
    process.env.DATE_TYPE = 'Today';

    // Get the expected date
    const expectedDate = format(new Date(), 'yyyy-MM-dd');

    // Expected message
    const expectedMessage = `Hey!, Today is ${expectedDate}`;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any);

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });

  it('should handle different DATE_TYPE environment variables', async () => {
    // Mock a different environment variable
    process.env.DATE_TYPE = 'Current Date';

    // Get the expected date
    const expectedDate = format(new Date(), 'yyyy-MM-dd');

    // Expected message
    const expectedMessage = `Hey!, Current Date is ${expectedDate}`;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any);

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });

  it('should handle undefined DATE_TYPE environment variable', async () => {
    // Unset the environment variable
    delete process.env.DATE_TYPE;

    // Get the expected date
    const expectedDate = format(new Date(), 'yyyy-MM-dd');

    // Expected message
    const expectedMessage = `Hey!, undefined is ${expectedDate}`;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any);

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });
});
