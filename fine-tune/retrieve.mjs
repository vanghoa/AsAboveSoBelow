import OpenAI from 'openai';
import { config } from 'dotenv';
config();

const openai = new OpenAI({
    apiKey: process.env['OPEN_AI_API_KEY'],
});

async function main() {
    let fineTune = await openai.fineTuning.jobs.retrieve(
        'ftjob-hTNqXnHQeW1SY1Nh2yBD747O'
    );

    console.log(fineTune);
}

main();

//ft:gpt-3.5-turbo-0613:bao-anh-bui::85rFM1dy
