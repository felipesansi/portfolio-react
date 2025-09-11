'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function NovoProjetoPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [urlDemo, setUrlDemo] = useState("");
  const [urlGithub, setUrlGithub] = useState("");
  const [ehApk, setEhApk] = useState(false);
  const [urlApk, setUrlApk] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoIA, setCarregandoIA] = useState(false);
  const [promptIA, setPromptIA] = useState("");
  const [mensagemForm, setMensagemForm] = useState<{ tipo: 'sucesso' | 'erro', texto: string } | null>(null);

  const router = useRouter();

  const aoSelecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
    }
  };

  const gerarSugestoes = async () => {
    if (!promptIA) {
      setMensagemForm({ tipo: 'erro', texto: 'Por favor, descreva a ideia do projeto para gerar sugestões.' });
      return;
    }
    setCarregandoIA(true);
    setMensagemForm(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
      const modelo = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

      const prompt = `
        Gere sugestões para um portfólio com base nesta ideia: "${promptIA}".

        Sua resposta deve ser um objeto JSON válido, sem qualquer texto adicional ou blocos de código. 
        O objeto deve conter as chaves "titulo", "descricao" e "stack".

        - O "titulo" deve ser criativo e conciso.
        - A "descricao" deve ter de 2 a 3 frases. Não repita o título dentro da descrição.
        - A "stack" deve ser uma lista de até 5 tecnologias.

        Exemplo:
        {
          "titulo": "Plataforma de Cursos Online",
          "descricao": "Uma plataforma EAD interativa com foco em gamificação. Permite aos usuários aprender novas habilidades através de vídeo-aulas e exercícios práticos.",
          "stack": ["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase"]
        }
      `;

      const resultado = await modelo.generateContent(prompt);
      const resposta = await resultado.response;
      let texto = resposta.text().replace(/```json|```/g, '').trim();

      let sugestoes;
      try {
        sugestoes = JSON.parse(texto);
      } catch {
        sugestoes = {
          titulo: "Sugestão de Projeto",
          descricao: texto,
          stack: []
        };
      }

      setTitulo(sugestoes.titulo || "");
      setDescricao(sugestoes.descricao || "");
      setTecnologias((sugestoes.stack || []).join(", "));
    } catch (erro) {
      console.error("Erro ao gerar sugestões com IA:", erro);
      setMensagemForm({ tipo: 'erro', texto: 'Ocorreu um erro ao gerar as sugestões. Tente novamente.' });
    } finally {
      setCarregandoIA(false);
    }
  };

  const aoEnviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      let urlImagem = "";

      if (imagem) {
        const idUnico = Date.now().toString();
        const extensao = imagem.name.split('.').pop();
        const nomeArquivo = `${idUnico}.${extensao}`;
        
        const { error: erroUpload } = await supabase.storage
          .from("portfolio-images")
          .upload(nomeArquivo, imagem);

        if (erroUpload) throw new Error("Erro no upload da imagem: " + erroUpload.message);

        const { data: dadosUrl } = supabase
          .storage
          .from("portfolio-images")
          .getPublicUrl(nomeArquivo);

        urlImagem = dadosUrl.publicUrl;
      }

      const { error: erroInsert } = await supabase
        .from("projetos")
        .insert({
          titulo,
          descricao,
          stack: tecnologias.split(',').map(s => s.trim()),
          imagem_url: urlImagem,
          live_url: urlDemo,
          github_url: urlGithub,
          is_apk: ehApk,
          apk_download_url: ehApk ? urlApk : null,
        });

      if (erroInsert) throw new Error("Erro ao salvar o projeto: " + erroInsert.message);

      setMensagemForm({ tipo: 'sucesso', texto: 'Projeto adicionado com sucesso!' });
      router.push("/admin");

    } catch (err: any) {
      console.error(err);
      setMensagemForm({ tipo: 'erro', texto: err.message });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Projeto</h2>
        <form onSubmit={aoEnviarFormulario} className="space-y-4">
          
          <div className="p-4 border border-sky-200 rounded-lg bg-sky-50 space-y-3">
            <h3 className="font-semibold text-gray-800">Gerar sugestões com IA</h3>
            <div>
              <label className="block text-gray-700 text-sm font-medium">Descreva a ideia do projeto</label>
              <textarea
                value={promptIA}
                onChange={(e) => setPromptIA(e.target.value)}
                placeholder="Ex: Um app de lista de tarefas com autenticação de usuários e notificações."
                className="w-full px-3 py-2 border rounded mt-1"
              />
            </div>
            <button 
              type="button" 
              onClick={gerarSugestoes} 
              disabled={carregandoIA} 
              className="bg-sky-500 text-white py-2 px-4 rounded hover:bg-sky-400 disabled:bg-gray-400"
            >
              {carregandoIA ? "Gerando..." : "Gerar Sugestões"}
            </button>
          </div>

          <div>
            <label className="block text-gray-700">Título</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="w-full px-3 py-2 border rounded"
            placeholder="Ex: Site web"/>
          </div>

          <div>
            <label className="block text-gray-700">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required className="w-full px-3 py-2 border rounded"
              placeholder="Ex: Site desevolvido como demotração"/>
          </div>

          <div>
            <label className="block text-gray-700">Tecnologias (separadas por vírgulas)</label>
            <input type="text" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} required className="w-full px-3 py-2 border rounded"
            placeholder="Ex: Javacript, html, css"/>
          </div>

          <div>
            <label className="block text-gray-700">Imagem do Projeto</label>
            <input type="file" onChange={aoSelecionarArquivo} required className="w-full"/>
          </div>

          <div>
            <label className="block text-gray-700">URL da Demonstração</label>
            <input type="url" value={urlDemo} onChange={(e) => setUrlDemo(e.target.value)} className="w-full px-3 py-2 border rounded"
            placeholder="Ex: www.demo.com.br"/>
          </div>

          <div>
            <label className="block text-gray-700">URL do GitHub</label>
            <input type="url" value={urlGithub} onChange={(e) => setUrlGithub(e.target.value)} required className="w-full px-3 py-2 border rounded"
            placeholder="Ex: www.github.com"/>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={ehApk} onChange={(e) => setEhApk(e.target.checked)} className="h-4 w-4"/>
            <label className="text-gray-700">É um aplicativo para Android?</label>
          </div>

          {ehApk && (
            <div>
              <label className="block text-gray-700">URL de Download do APK</label>
              <input type="url" value={urlApk} onChange={(e) => setUrlApk(e.target.value)} className="w-full px-3 py-2 border rounded"/>
            </div>
          )}

          {mensagemForm && (
            <div className={`p-3 rounded text-center ${mensagemForm.tipo === 'sucesso' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {mensagemForm.texto}
            </div>
          )}

          <button type="submit" disabled={carregando} className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600">
            {carregando ? "Adicionando..." : "Adicionar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
}
