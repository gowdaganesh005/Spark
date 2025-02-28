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
        },{
            role:"user",
            content:`ULTRA IMPORTANT: Do Not Generate package.json again it should be same as template package.json only
                     IMPORTANT POINTS:
                     - Dont use lucide react anymore .
                     - Do not import any component from lucide react and do not use it anywhere
                     - Any app generated must be production ready so always add login signup logout authentication pages until not mentioned;
                     - Every website must have a hero section and landing page with beautiful design using tailwind css ;
                     - Make sure that the all websites have a appropriate header section and footer section;
                     - always make the routing proper using react-router-dom;
                     - If the functionality or feature of a website requires admin role and access do generate accordingly all the necessary routes and page sections for adding functionality;
                     - Always add demo data to demonstrate how can a website look on populated data
                     - Instead of using images make all stylings beautiful and colorful using tailwind css classes and colors , gradients , shadows , transition and basic animations.;
                     
                     `
        },
        ...messages
    ]
    const response=await groq.chat.completions.create({
        messages:finalmessage,
        model: "llama-3.3-70b-versatile",
        stop:null,
        max_tokens:10000
        

    })
    
    return res.json({data:response.choices[0].message})
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