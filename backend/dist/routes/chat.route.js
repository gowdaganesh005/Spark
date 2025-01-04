"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const groq_1 = __importDefault(require("../lib/llm/groq"));
const promts_1 = require("../lib/llm/promts");
exports.router = (0, express_1.Router)();
exports.router.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = req.body.messages;
    const finalmessage = [{
            role: "system",
            content: (0, promts_1.getSystemPrompt)()
        }, {
            role: "user",
            content: `ULTRA IMPORTANT: Do Not Generate package.json again it should be same as template package.json only
                     IMPORTANT POINTS:
                     - Dont use lucide react anymore .
                     - Do not import any component from lucide react and do not use it anywhere
                     - Any app generated must be production ready so always add login signup logout authentication pages until not mentioned;
                     - Every website must have a hero section and landing page with beautiful design using tailwind css ;
                     - Make sure that the all websites have a appropriate header section and footer section;
                     - always make the routing proper using react-router-dom;
                     - If the functionality or feature of a website requires admin role and access do generate accordingly all the necessary routes and page sections for adding functionality;
                     - Always add demo data to demonstrate how can a website look on populated data
                     - Instead of using images make all stylings beautiful and colorful using tailwind css classes and colors , gradients , shadows transition and basic animations.;
                     
                     `
        },
        ...messages
    ];
    const response = yield groq_1.default.chat.completions.create({
        messages: finalmessage,
        model: "llama-3.3-70b-versatile",
        stop: null,
        max_tokens: 10000
    });
    return res.json({ data: response.choices[0].message });
}));
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
