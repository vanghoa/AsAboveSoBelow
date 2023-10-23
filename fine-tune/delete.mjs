import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_API_KEY'],
});

async function main() {
    const file = await openai.files.del('file-0UG2MbnF53zmxpaLeCI3ysCA');

    console.log(file);
}

main();
