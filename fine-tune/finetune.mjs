import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_API_KEY'],
});

async function main() {
    const fineTune = await openai.fineTuning.jobs.create({
        training_file: 'file-P9Fk9rtdXHL9rYF7WPXipREO',
        model: 'gpt-3.5-turbo',
    });

    console.log(fineTune);
}

main();
// ftjob-hTNqXnHQeW1SY1Nh2yBD747O
