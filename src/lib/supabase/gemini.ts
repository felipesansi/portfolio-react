import { GoogleGenerativeAI } from "@google/generative-ai";

// Pega a chave da API do Gemini das variáveis de ambiente.
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("A variável de ambiente NEXT_PUBLIC_GEMINI_API_KEY não está definida.");
}

// Inicializa o cliente do Google Generative AI com a chave da API.
export const gemini = new GoogleGenerativeAI(apiKey);