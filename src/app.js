import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import * as dotenv from "dotenv";
import readlineSync from 'readline-sync';
//Setting env up
dotenv.config();
//Creating a model
const model = new OpenAI({
    temperature: 0.9,
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
});
//Creating prompt teamplate
const template = "Tell me about celebrity {name}";
const frist_prompt_template = new PromptTemplate({
    template: template,
    inputVariables: ["name"],
});
//Creating a chain that will substitute the prompt template
const chain_1 = new LLMChain({ llm: model, prompt: frist_prompt_template, verbose: true, outputKey: 'person' });
//creating second chain
const template_2 = "When was {person} born?";
const second_prompt_template = new PromptTemplate({
    template: template_2,
    inputVariables: ["person"]
});
//creating the secong chain
const chain_2 = new LLMChain({ llm: model, prompt: second_prompt_template, verbose: true, outputKey: 'dob' });
//Creating a sequetial chain
const sequetial_chain = new SimpleSequentialChain({ chains: [chain_1, chain_2], verbose: true });
//Asking the user
const input = readlineSync.question('Celebrity Search: ');
//Calling the chain
const res = await sequetial_chain.run(input);
console.log(res);
