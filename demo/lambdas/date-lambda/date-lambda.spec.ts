import { APIGatewayProxyResult } from 'aws-lambda';
import { handler } from './date-lambda';
import { format } from 'date-fns';

describe('Lambda Handler', () => {
  it('should return a formatted message with the current date when DATE_TYPE is "today"', async () => {
    // Mock the environment variable
    process.env.DATE_TYPE = 'today';

    // Get the expected date
    const expectedDate = format(new Date(), 'yyyy-MM-dd');

    // Expected message
    const expectedMessage = `Hey!, today is ${expectedDate}`;

    // Call the handler
    const result = (await handler({} as any, {} as any, {} as any)) as APIGatewayProxyResult;

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });

  it('should handle empty DATE_TYPE environment variable', async () => {
    // Unset the environment variable
    delete process.env.DATE_TYPE;

    // Expected message
    const expectedMessage = `Hey!,  is `;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });

  it('should handle non-today DATE_TYPE environment variable', async () => {
    // Mock the environment variable
    process.env.DATE_TYPE = 'not-today';

    // Expected message
    const expectedMessage = `Hey!, not-today is `;

    // Call the handler
    const result = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    // Assert the response
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify({ message: expectedMessage }));
  });
});
