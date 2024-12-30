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
const react_1 = require("../utils/defaults/react");
const node_1 = require("../utils/defaults/node");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const prompt = req.body.prompt;
    const response = yield groq_1.default.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "Return either node or react based on the what do you the project should be. Only return a single word either 'node' or 'react'. In any case do not return any thing else extra. Response should be case sensitive always eg (react != React) Only return a single word either 'node' or 'react'."
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
    });
    const answer = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message.content;
    console.log(answer);
    if (answer == 'react') {
        return res.json({
            prompts: `${promts_1.BASE_PROMT} Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n ${react_1.basePrompt} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
            uiPrompts: [react_1.basePrompt]
        });
    }
    if (answer == 'node') {
        return res.json({
            prompts: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n ${node_1.basePrompt} \n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
            uiPrompts: [node_1.basePrompt]
        });
    }
    return res.status(500).json({ answer });
}));
