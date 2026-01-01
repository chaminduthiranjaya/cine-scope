import { InferenceClient } from "@huggingface/inference";
import "server-only";

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HF_API_KEY) {
  throw new Error("HUGGINGFACE_API_KEY is not set");
}

// Free open-source model
const MODEL = "mistralai/Mistral-7B-Instruct";

/**
 * Calls HuggingFace API to generate text based on the given prompt
 * @param prompt - The prompt to generate text from
 * @returns The generated text
 */
export async function callHuggingFace(prompt: string) {
  const client = new InferenceClient(HF_API_KEY);

  const res = await client.textGeneration({
    model: MODEL,
    inputs: prompt,
    parameters: {
      max_new_tokens: 350,
      temperature: 0.2,
      return_full_text: false,
    },
  });

  if (!res.ok) {
    console.error("HF error:", res.status);
    throw new Error("HuggingFace request failed");
  }

  return (res.generated_text ?? "").trim();
}
