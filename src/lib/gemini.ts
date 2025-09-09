import { GoogleGenerativeAI } from "@google/generative-ai";

// É uma boa prática carregar a chave da API a partir de variáveis de ambiente.
// Para o Next.js, use um arquivo .env.local na raiz do seu projeto com:
// GEMINI_API_KEY="SUA_CHAVE_API_AQUI"
// Esta variável de ambiente só estará disponível no lado do servidor (Server Components, API Routes).
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("A chave da API do Gemini não foi configurada nas variáveis de ambiente.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * Gera uma descrição, título e stack para um projeto a partir de sua URL do GitHub.
 * @param githubUrl A URL do repositório no GitHub.
 * @returns Uma string com o conteúdo gerado pelo modelo.
 */
export async function generateProjectInfoFromGithub(githubUrl: string): Promise<string> {
  const prompt = `Analise o projeto no seguinte repositório do GitHub e gere uma breve descrição, as tecnologias (stack) utilizadas e um título para ele. Formate a resposta em JSON com as chaves "titulo", "descricao" e "stack" (como um array de strings). Link: ${githubUrl}`;

  // Obtenha o modelo generativo. 'gemini-1.5-flash' é uma boa escolha para velocidade e custo.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = await response.text();
    console.log(text);
    return text;
  } catch (error) {
    console.error("Erro ao gerar conteúdo:", error);
    throw new Error("Falha ao se comunicar com a API do Gemini.");
  }
}
