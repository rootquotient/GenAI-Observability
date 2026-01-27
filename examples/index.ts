import 'dotenv/config';
import { withGenAIMonitoring } from '../packages/middleware/genai-monitor.js';
import { openAIProvider } from '../packages/providers/openai/openai.wrapper.js';
import OpenAI from 'openai';

// Check for API Key
if (!process.env.OPENAI_API_KEY) {
   console.error('❌ Error: OPENAI_API_KEY is not set in .env file.');
   console.error('Please add your API key to .env to run this example.');
   process.exit(1);
}

const openAI = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
   const prompt = 'Explain the concept of observability in software engineering in one sentence';

   console.log(`Prompt: "${prompt}"`);

   try {
      // Wrap the OpenAI call with the monitoring middleware
      const response = await withGenAIMonitoring(openAIProvider, prompt, async () => {
         return await openAI.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
               { role: 'system', content: 'You are a helpful tech lead' },
               { role: 'user', content: prompt },
            ],
         });
      });

      const content = response.choices[0]?.message?.content;
      console.log(`🤖 Response: "${content}"`);
   } catch (error) {
      console.error('Error during GenAI call:', error);
   }
}

main();

