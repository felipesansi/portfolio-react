'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default function NovoProjetoPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [stack, setStack] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isApk, setIsApk] = useState(false);
  const [apkDownloadUrl, setApkDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const handleGenerateSuggestions = async () => {
    if (!aiPrompt) {
      setFormMessage({ type: 'error', text: 'Por favor, descreva a ideia do projeto para gerar sugestões.' });
      return;
    }
    setAiLoading(true);
    setFormMessage(null);

    try {
      // Inicialize o cliente do Gemini aqui, onde o código é executado no cliente.
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `
        Com base na seguinte ideia de projeto, gere sugestões para um portfólio.
        Ideia: "${aiPrompt}"

        Forneça uma resposta em formato JSON com as seguintes chaves:
        - "titulo": um título criativo e conciso para o projeto.
        - "descricao": uma descrição de 2 a 3 frases sobre o projeto, seus objetivos e funcionalidades.
        - "stack": uma lista de até 5 tecnologias principais usadas, em formato de array de strings.

        Exemplo de resposta:
        {
          "titulo": "Plataforma de Cursos Online",
          "descricao": "Uma plataforma EAD interativa que permite aos usuários aprenderem novas habilidades através de vídeos e exercícios. O projeto foca em uma experiência de usuário fluida e gamificada.",
          "stack": ["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase"]
        }
      `;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json|```/g, '').trim();
      const suggestions = JSON.parse(text);

      setTitulo(suggestions.titulo || "");
      setDescricao(suggestions.descricao || "");
      setStack((suggestions.stack || []).join(', '));
    } catch (error) {
      console.error("Erro ao gerar sugestões com IA:", error);
      setFormMessage({ type: 'error', text: 'Ocorreu um erro ao gerar as sugestões. Tente novamente.' });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";

      // 1. Upload da imagem para o Supabase Storage
      if (imagem) {
        const fileExtension = imagem.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const { error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imagem);

        if (uploadError) {
          throw new Error("Erro no upload da imagem: " + uploadError.message);
        }

        // 2. OBTENÇÃO DO URL PÚBLICO:
        // Usamos getPublicUrl() para garantir que a URL está correta.
        const { data: publicUrlData } = supabase
          .storage
          .from("portfolio-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      // 3. Inserir os dados do projeto na tabela 'projetos'
      const { error: insertError } = await supabase
        .from("projetos")
        .insert({
          titulo,
          descricao,
          stack: stack.split(',').map(s => s.trim()),
          imagem_url: imageUrl,
          live_url: liveUrl,
          github_url: githubUrl,
          is_apk: isApk,
          apk_download_url: isApk ? apkDownloadUrl : null,
        });

      if (insertError) {
        throw new Error("Erro ao salvar o projeto: " + insertError.message);
      }

      setFormMessage({ type: 'success', text: 'Projeto adicionado com sucesso!' });
      router.push("/admin");

    } catch (err: any) {
      console.error(err);
      setFormMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-sky-200 rounded-lg bg-sky-50 space-y-3">
            <h3 className="font-semibold text-gray-800">Gerar sugestões com IA</h3>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Descreva a ideia do projeto</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ex: Um app de lista de tarefas com autenticação de usuários e notificações."
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </div>
            <button type="button" onClick={handleGenerateSuggestions} disabled={aiLoading} className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-400 disabled:bg-gray-400">
              {aiLoading ? "Gerando..." : "Gerar Sugestões"}
            </button>
          </div>
          <div>
            <label className="block text-gray-700">Título</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Stack (separado por vírgulas)</label>
            <input type="text" value={stack} onChange={(e) => setStack(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Imagem do Projeto</label>
            <input type="file" onChange={handleFileChange} required className="w-full"/>
          </div>
          <div>
            <label className="block text-gray-700">URL do Live Demotração</label>
            <input type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)}  className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">URL do GitHub</label>
            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={isApk} onChange={(e) => setIsApk(e.target.checked)} className="h-4 w-4"/>
            <label className="text-gray-700">É um aplicativo para Android?</label>
          </div>
          {isApk && (
            <div>
              <label className="block text-gray-700">URL de Download do APK</label>
              <input type="url" value={apkDownloadUrl} onChange={(e) => setApkDownloadUrl(e.target.value)} className="w-full px-3 py-2 border rounded"/>
            </div>
          )}
          {formMessage && (
            <div className={`p-3 rounded text-center ${formMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {formMessage.text}
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600">
            {loading ? "Adicionando..." : "Adicionar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
}
