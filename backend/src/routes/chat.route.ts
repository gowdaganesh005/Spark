import { Router } from "express"
import groq from "../lib/llm/groq"
import { openai } from "../lib/llm/openRouter"
import { BASE_PROMT, getSystemPrompt } from "../lib/llm/promts"
import { basePrompt as reactBasePrompt } from "../utils/defaults/react"
import { basePrompt as nodeBasePrompt } from "../utils/defaults/node"

export const router=Router()

router.post("/chat",async (req:any,res:any)=>{
    const messages=req.body.messages
    const finalmessage=[{
        role:"system",
        content:getSystemPrompt()
        },
        ...messages
    ]
    const response=await groq.chat.completions.create({
        messages:finalmessage,
        model: "llama-3.3-70b-versatile",
        stop:null,
        max_tokens:10000
        

    })
    console.log(response.choices[0].message)
    return res.json({})
})

// router.post("/chat",async (req:any,res:any)=>{
//     const messages=req.body.messages
//     const finalmessage=[{
//         role:"system",
//         content:getSystemPrompt()
//         },
//         ...messages
//     ]
//     const completion = await openai.chat.completions.create({
//         model: "google/gemini-2.0-flash-exp:free",
//         messages:  [
//             {
//               "role": "user",
//               "content": "what is data cutoff date of yours"
//             }
//           ],
//         max_tokens:8000
        
//       })
    
//       console.log(completion.choices[0].message.content)
//     return res.json({})
// })