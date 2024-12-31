"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const template_route_1 = require("./routes/template.route");
const chat_route_1 = require("./routes/chat.route");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.use('/api', template_route_1.router);
app.use('/api', chat_route_1.router);
app.listen(3000, () => (console.log("Server listening on port 3000")));
