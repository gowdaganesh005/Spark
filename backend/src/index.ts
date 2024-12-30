require("dotenv").config()
import groq from "./lib/llm/groq";
import { getSystemPrompt,BASE_PROMT } from "./lib/llm/promts";
import { basePrompt as reactBasePrompt } from "./utils/defaults/react";
import { basePrompt as nodeBaseprompt } from "./utils/defaults/node";
import express from "express"
import {router as templateRouter} from "./routes/template.route"
import {router as chatRouter } from "./routes/chat.route"

const app=express()
app.use(express.json())

// export async function main() {
//   const chatCompletion = await getGroqChatCompletion();
  
//   console.log(chatCompletion.choices[0]?.message?.content|| "");
// }

// export async function getGroqChatCompletion() {
//   return groq.chat.completions.create({
//     messages: [
//         {
//             role:"system",
//             content:getSystemPrompt()
//         },
//       {
//         role: "user",
//         content:  `${BASE_PROMT}, Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
//       },
//     ],
//     model: "llama-3.3-70b-versatile",
//   });
// }

app.use('/api',templateRouter)
app.use('/api',chatRouter)

app.listen(3000,()=>(console.log("Server listening on port 3000")))