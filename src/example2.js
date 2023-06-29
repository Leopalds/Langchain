import * as dotenv from "dotenv";
import { PromptTemplate } from "langchain/prompts";
dotenv.config();
const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
});
const res = await prompt.format({ product: "wizard hats" });
console.log(res);
