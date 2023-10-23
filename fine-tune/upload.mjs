import fs from 'fs';
import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_API_KEY'],
});

async function main() {
    const file = await openai.files.create({
        file: fs.createReadStream('fine-tune/data.jsonl'),
        purpose: 'fine-tune',
    });

    console.log(file);
}

main();

// file-P9Fk9rtdXHL9rYF7WPXipREO
