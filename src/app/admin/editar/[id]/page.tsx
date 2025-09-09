'use client';

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter, useParams } from "next/navigation";

export default function EditarProjetoPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);
  const [imagemUrlAtual, setImagemUrlAtual] = useState<string | null>(null);
  const [urlLive, setUrlLive] = useState("");
  const [urlGithub, setUrlGithub] = useState("");
  const [temApk, setTemApk] = useState(false);
  const [urlDownloadApk, setUrlDownloadApk] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);

  const router = useRouter();
  const params = useParams();
  const projetoId = params.id;

  useEffect(() => {
    if (!projetoId) return;

    const buscarProjeto = async () => {
      setCarregandoDados(true);
      const { data, error } = await supabase
        .from("projetos")
        .select("*")
        .eq("id", projetoId)
        .single();

      if (error || !data) {
        console.error("Erro ao buscar projeto:", error);
        alert("Projeto não encontrado ou erro ao carregar.");
        router.push("/admin/gerenciar");
        return;
      }

      setTitulo(data.titulo);
      setDescricao(data.descricao);
      setTecnologias(data.stack.join(", "));
      setImagemUrlAtual(data.imagem_url);
      setUrlLive(data.live_url);
      setUrlGithub(data.github_url);
      setTemApk(data.is_apk);
      setUrlDownloadApk(data.apk_download_url || "");
      setCarregandoDados(false);
    };

    buscarProjeto();
  }, [projetoId, router]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagem(e.target.files[0]);
      setImagemUrlAtual(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      let urlDaImagem = imagemUrlAtual;

      if (imagem) {
        const extensaoArquivo = imagem.name.split('.').pop();
        const nomeArquivo = `${Date.now()}.${extensaoArquivo}`;
        const { error: erroUpload } = await supabase.storage
          .from("portfolio-images")
          .upload(nomeArquivo, imagem);

        if (erroUpload) {
          throw new Error("Erro no upload da imagem: " + erroUpload.message);
        }
        
        const { data: dadosUrlPublica } = supabase.storage
          .from("portfolio-images")
          .getPublicUrl(nomeArquivo);
          
        urlDaImagem = dadosUrlPublica.publicUrl;
      }

      const { error: erroAtualizacao } = await supabase
        .from("projetos")
        .update({
          titulo,
          descricao,
          stack: tecnologias.split(',').map(s => s.trim()),
          imagem_url: urlDaImagem,
          live_url: urlLive,
          github_url: urlGithub,
          is_apk: temApk,
          apk_download_url: temApk ? urlDownloadApk : null,
        })
        .eq("id", projetoId);

      if (erroAtualizacao) {
        throw new Error("Erro ao atualizar o projeto: " + erroAtualizacao.message);
      }

      alert("Projeto atualizado com sucesso!");
      router.push("/admin/gerenciar");

    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setCarregando(false);
    }
  };

  if (carregandoDados) {
    return <div className="min-h-screen flex items-center justify-center">Carregando dados do projeto...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6">Editar Projeto</h2>
        <form onSubmit={handleEditarSubmit} className="space-y-4">
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
            <input type="text" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">Imagem do Projeto</label>
            {imagemUrlAtual && <img src={imagemUrlAtual} alt="Preview" className="w-48 h-auto my-2" />}
            <input type="file" onChange={handleImagemChange} className="w-full"/>
            <p className="text-sm text-gray-500">Deixe em branco para manter a imagem atual.</p>
          </div>
          <div>
            <label className="block text-gray-700">URL do Live Demo</label>
            <input type="url" value={urlLive} onChange={(e) => setUrlLive(e.target.value)} className="w-full px-3 py-2 border rounded"/>
          </div>
          <div>
            <label className="block text-gray-700">URL do GitHub</label>
            <input type="url" value={urlGithub} onChange={(e) => setUrlGithub(e.target.value)} required className="w-full px-3 py-2 border rounded"/>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={temApk} onChange={(e) => setTemApk(e.target.checked)} className="h-4 w-4"/>
            <label className="text-gray-700">É um aplicativo Android?</label>
          </div>
          {temApk && (
            <div>
              <label className="block text-gray-700">URL de Download do APK</label>
              <input type="url" value={urlDownloadApk} onChange={(e) => setUrlDownloadApk(e.target.value)} className="w-full px-3 py-2 border rounded"/>
            </div>
          )}
          <button type="submit" disabled={carregando} className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600">
            {carregando ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
}