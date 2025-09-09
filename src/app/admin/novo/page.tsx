'use client';

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
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
        // Este é o ajuste. Usamos getPublicUrl() para garantir que a URL está correta.
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
          imagem_url: imageUrl, // AQUI VAI A URL PÚBLICA CORRETA
          live_url: liveUrl,
          github_url: githubUrl,
          is_apk: isApk,
          apk_download_url: isApk ? apkDownloadUrl : null,
        });

      if (insertError) {
        throw new Error("Erro ao salvar o projeto: " + insertError.message);
      }

     <p className="text-green-500">Projeto adicionado com sucesso!</p>
      router.push("/admin");

    } catch (err: any) {
      console.error(err);
    <p className="text-red-500">{err.message}</p>
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Adicionar Novo Projeto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" disabled={loading} className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600">
            {loading ? "Adicionando..." : "Adicionar Projeto"}
          </button>
        </form>
      </div>
    </div>
  );
}