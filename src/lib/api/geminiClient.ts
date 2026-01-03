import "server-only";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

export const genAI = new GoogleGenAI({ apiKey });

// Pick a fast + cheap model for extraction.
// (You can change later if needed.)
export const GEMINI_MODEL = "gemini-2.5-flash";