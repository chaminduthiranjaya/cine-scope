import "server-only";

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
if (!HF_TOKEN) throw new Error("HUGGINGFACE_API_KEY is not set");

/**
 * IMPORTANT:
 * - Use a model that works for you with a provider suffix.
 * - You said "it works" already, so keep that same model string here.
 */
const MODEL = "HuggingFaceTB/SmolLM3-3B:hf-inference";

type HFChatResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

export async function callHuggingFace(prompt: string): Promise<string> {
  const res = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            'Return the movie name in the format {"title": "Movie Name"} and add {"year": "Year"} if available also add {"alternatives": ["Title1", "Title2"]} if available. reutn only the json object.',
        },
        { role: "user", content: prompt },
      ],
      temperature: 0,
      top_p: 1,
      max_tokens: 250,
    }),
  });

  const data = (await res.json().catch(() => null)) as HFChatResponse | null;
  console.log(data?.choices?.[0]?.message);

  if (!res.ok) {
    throw new Error(
      data?.error?.message || `HF chat completion failed (${res.status})`
    );
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  console.log("**********");
  if (!text) throw new Error("No content returned from HF chat completion");

  return text;
}
