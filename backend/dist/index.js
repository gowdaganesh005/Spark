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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
exports.getGroqChatCompletion = getGroqChatCompletion;
require("dotenv").config();
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({ apiKey: process.env.GROQ_API_KEY });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        var _d, _e;
        const chatCompletion = yield getGroqChatCompletion();
        try {
            for (var _f = true, chatCompletion_1 = __asyncValues(chatCompletion), chatCompletion_1_1; chatCompletion_1_1 = yield chatCompletion_1.next(), _a = chatCompletion_1_1.done, !_a; _f = true) {
                _c = chatCompletion_1_1.value;
                _f = false;
                let chunk = _c;
                process.stdout.write(((_e = (_d = chunk.choices[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content) || "");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_f && !_a && (_b = chatCompletion_1.return)) yield _b.call(chatCompletion_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
function getGroqChatCompletion() {
    return __awaiter(this, void 0, void 0, function* () {
        return groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "what is your information cutoff date",
                },
            ],
            model: "llama-3.3-70b-versatile",
            stop: null,
            stream: true
        });
    });
}
main();
