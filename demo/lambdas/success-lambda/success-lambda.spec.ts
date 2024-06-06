import { APIGatewayProxyResult } from 'aws-lambda';
    import { handler } from './success-lambda';
    
    describe('Lambda Handler', () => {
      it('should return a 200 status code and Welcome API message', async () => {
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
        expect(body.message).toBe('Welcome to the API!');
      });
    });    
