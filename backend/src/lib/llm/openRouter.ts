import OpenAI from "openai"

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  
})

async function main() {
  const completion = await openai.chat.completions.create({
    model: "google/gemini-flash-1.5-exp",
    messages: [
      {
        "role": "user",
        "content": "what is data cutoff date of yours"
      }
    ]
  })

  console.log(completion.choices[0].message)
}

