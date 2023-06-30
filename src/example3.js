//Prompt Template and calling OpenAI
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import * as dotenv from "dotenv";
dotenv.config();
//Creating a model
const model = new OpenAI({
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
});
//Creating prompt teamplate
const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
});
//Creating a chain that will substitute the prompt template
const chain = new LLMChain({ llm: model, prompt: prompt });
//Calling the chain
const res = await chain.call({ product: "wizard hats" });
console.log(res);
