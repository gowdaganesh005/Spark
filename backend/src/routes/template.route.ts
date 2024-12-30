import { Router } from "express"
import groq from "../lib/llm/groq"
import { BASE_PROMT } from "../lib/llm/promts"
import { basePrompt as reactBasePrompt } from "../utils/defaults/react"
import { basePrompt as nodeBasePrompt } from "../utils/defaults/node"


const router=Router()

router.post("/template",async (req:any,res:any)=>{
    const prompt=req.body.prompt
    const response=await groq.chat.completions.create({
        messages: [
            {
                role:"system",
                content:"Return either node or react based on the what do you the project should be. Only return a single word either 'node' or 'react'. In any case do not return any thing else extra. Response should be case sensitive always eg (react != React) Only return a single word either 'node' or 'react'."
            },
          {
            role: "user",
            content:  prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });
      
    const answer:string | null=response.choices[0]?.message.content 
    console.log(answer)
    
    if(answer=='react'){
        return res.json({
            prompts: `${BASE_PROMT} Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n ${reactBasePrompt} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
            uiPrompts:[reactBasePrompt]
        })
    }
    if(answer=='node'){
        return res.json({
            prompts: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n ${nodeBasePrompt} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
            uiPrompts:[nodeBasePrompt]
        })
    }

    return res.status(500).json({answer})


})

export { router }