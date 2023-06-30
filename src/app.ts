import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SequentialChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory"
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

//Memory
const person_memory = new BufferMemory({inputKey: 'name', memoryKey:'chat_history'})
const dob_memory = new BufferMemory({inputKey: 'person', memoryKey:'chat_history'})
const description_memory = new BufferMemory({inputKey: 'dob', memoryKey:'description_history'})

//Creating prompt teamplate
const template = "Tell me about celebrity {name}";
const frist_prompt_template = new PromptTemplate({
    template: template,
    inputVariables: ["name"],
});

//Creating a chain that will substitute the prompt template
const chain_1 = new LLMChain({ llm: model, prompt: frist_prompt_template, outputKey: 'person', memory:person_memory});

//creating second chain
const template_2 = "When was {person} born?"
const second_prompt_template = new PromptTemplate({
    template: template_2,
    inputVariables: ["person"]
});

//creating the secong chain
const chain_2 = new LLMChain({llm: model, prompt: second_prompt_template, outputKey: 'dob', memory:dob_memory})

//creating third chain
const template_3 = "Mention 5 major events happened around {dob} in brazil"
const third_prompt_template = new PromptTemplate({
    template: template_3,
    inputVariables: ["dob"]
});

//creating the secong chain
const chain_3 = new LLMChain({llm: model, prompt: third_prompt_template, outputKey: 'description', memory:description_memory})

//Creating a sequetial chain
const sequetial_chain = new SequentialChain({
    chains: [chain_1, chain_2, chain_3],
    inputVariables:['name'],
    outputVariables:['person', 'dob', 'description']
})

//Asking the user
const input = readlineSync.question('Celebrity Search: ');

//Calling the chain
const res = await sequetial_chain.call({'name': input})
console.log(res);
console.log( person_memory.chatHistory )