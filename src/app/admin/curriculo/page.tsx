"use client"; // Adicionar "use client" para componentes com hooks no App Router

import react, { use }  from 'react'
import { useState , useEffect, } from 'react';
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";

import { b } from 'framer-motion/client';

export default function CurriculoPage() {
  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [aquivo, setAquivo] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [curriculoUrl, setCurriculoUrl] = useState<string | null>(null);
  const router = useRouter();
    
  const nomeBucket = "curriculo"; // Nome do bucket onde o currículo está armazenado
    
  const caminhoArquivo = "curriculo.pdf"; // Caminho do arquivo dentro do bucket
 
    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (!user) {
                router.push("/login");
            } else {
                buscarCurriculoURL();
            }
        };

        fetchUser();
    }, [router]);
    // Função para buscar a URL do currículo
    const buscarCurriculoURL = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = supabase
                .storage
                .from(nomeBucket)
                .getPublicUrl(caminhoArquivo);

          
            const resposta = await fetch(data.publicUrl);
            if (resposta.ok) {
                setCurriculoUrl(data.publicUrl);
            } else {
            
                throw new Error("Currículo não encontrado.");
            }
        } catch (err: any) {
            setError("Nenhum currículo encontrado. Por favor, envie um.");
            setCurriculoUrl(null); // Garante que a URL antiga seja limpa
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    // Função para fazer logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };
    // Função para lidar com a mudança de arquivo
    const buscarArquivoCurriculo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAquivo(e.target.files[0]);
        }
    };
    // Função para fazer upload do currículo
    const buscarUploadCurriculo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aquivo) {
            setError("Por favor, selecione um arquivo para enviar.");
            return;
        }
        setUploading(true);
        setError(null);
        try {
           
            const { error: uploadError } = await supabase
                .storage
                .from(nomeBucket)
                .upload(caminhoArquivo, aquivo, { upsert: true });      
            if (uploadError) {
                throw new Error("Erro no upload do currículo: " + uploadError.message);
            }
            alert("Currículo enviado com sucesso!");
            setAquivo(null);
            buscarCurriculoURL(); // Atualiza a URL do currículo após o upload
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        }   finally {   
            setUploading(false);
        }
    };
    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Carregando...</p>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">  
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Gerenciar Currículo</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Sair
                    </button>   
                </div>
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {curriculoUrl ? (
                    <div className="mb-6">
                        <a
                            href={curriculoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >   
                            Visualizar Currículo Atual
                        </a>
                    </div>  
                ) : (
                    <p className="mb-6">Nenhum currículo encontrado. Por favor, envie um.</p>
                )}

                <form onSubmit={buscarUploadCurriculo} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Selecionar Novo Currículo (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={buscarArquivoCurriculo}
                            className="w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600"
                    >
                        {uploading ? "Enviando..." : "Enviar Currículo"}
                    </button>
                </form>
            </div>
        </div>
    );          





}





