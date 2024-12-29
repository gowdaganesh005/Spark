require("dotenv").config()
import Groq from "groq-sdk";
import { getSystemPrompt } from "./lib/llm/promts";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  
  console.log(chatCompletion.choices[0]?.message?.content|| "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
        {
            role:"system",
            content:getSystemPrompt()
        },
      {
        role: "user",
        content: "what is your information cutoff date",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}

main()