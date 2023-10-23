const { app } = require('@azure/functions');
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_API_KEY'],
});

app.http('asabovesobelow', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try {
            const { messages } = await request.json();
            context.log(messages);
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [...messages],
                max_tokens: 300,
            });
            return { jsonBody: { completion: response } };
        } catch (error) {
            if (error instanceof OpenAI.APIError) {
                context.error(error.status); // e.g. 401
                context.error(error.message); // e.g. The authentication token you passed was invalid...
                context.error(error.code); // e.g. 'invalid_api_key'
                context.error(error.type); // e.g. 'invalid_request_error'
            } else {
                // Non-API error
                context.log(error);
            }
            return { jsonBody: { error: true, msg: error.message } };
        }
    },
});
