'use client';

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditarProjetoPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [stack, setStack] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isApk, setIsApk] = useState(false);
  const [apkDownloadUrl, setApkDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const router = useRouter();
  const params = useParams();
  const projectId = params.id;

  useEffect(() => {
    if (!projectId) return;

    const fetchProjeto = async () => {
      setLoadingData(true);
      const { data, error } = await supabase
        .from("projetos")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error || !data) {
        console.error("Erro ao buscar projeto:", error);
        alert("Projeto não encontrado ou erro ao carregar.");
        router.push("/admin/gerenciar");
        return;
      }

      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setStack(data.stack.join(", "));
      setCurrentImageUrl(data.imagem_url);
      setLiveUrl(data.live_url);
      setGithubUrl(data.github_url);
      setIsApk(data.is_apk);
      setApkDownloadUrl(data.apk_download_url || "");
      setLoadingData(false);
    };

    fetchProjeto();
  }, [projectId, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
      setCurrentImageUrl(URL.createObjectURL(e.target.files[0])); // Show preview
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentImageUrl;

      // 1. Upload da nova imagem, se houver
      if (imagem) {
        const fileExtension = imagem.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const { error: uploadError } = await supabase.storage
          .from("portfolio-images")
          .upload(fileName, imagem);

        if (uploadError) {
          throw new Error("Erro no upload da imagem: " + uploadError.message);
        }
        
        const { data: publicUrlData } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(fileName);
          
        imageUrl = publicUrlData.publicUrl;
      }

      // 2. Atualizar os dados do projeto
      const { error: updateError } = await supabase
        .from("projetos")
        .update({
          titulo,
          descricao,
          stack: stack.split(',').map(s => s.trim()),
          imagem_url: imageUrl,
          live_url: liveUrl,
          github_url: githubUrl,
          is_apk: isApk,
          apk_download_url: isApk ? apkDownloadUrl : null,
        })
        .eq("id", projectId);

      if (updateError) {
        throw new Error("Erro ao atualizar o projeto: " + updateError.message);
      }

      alert("Projeto atualizado com sucesso!");
      router.push("/admin/gerenciar");

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return <div className="min-h-screen flex items-center justify-center">Carregando dados do projeto...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Editar Projeto</h2>
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
            {currentImageUrl && <img src={currentImageUrl} alt="Preview" className="w-48 h-auto my-2" />}
            <input type="file" onChange={handleFileChange} className="w-full"/>
            <p className="text-sm text-gray-500">Deixe em branco para manter a imagem atual.</p>
          </div>
          <div>
            <label className="block text-gray-700">URL do Live Demo</label>
            <input type="url" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">URL do GitHub</label>
            <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={isApk} onChange={(e) => setIsApk(e.target.checked)} className="h-4 w-4"/>
            <label className="text-gray-700">É um APK?</label>
          </div>
          {isApk && (
            <div>
              <label className="block text-gray-700">URL de Download do APK</label>
              <input type="url" value={apkDownloadUrl} onChange={(e) => setApkDownloadUrl(e.target.value)} className="w-full px-3 py-2 border rounded"/>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600">
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}
