import * as dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

dotenv.config();

const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    openAIApiKey: process.env.OPENAI_API_KEY,
});

const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
  template: template,
  inputVariables: ["product"],
});

const res = await prompt.format({ product: "wizard hats" });
console.log(res);