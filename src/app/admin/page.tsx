'use client';

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projetos, setProjetos] = useState<any[]>([]);
  const router = useRouter();

  // Função para buscar o usuário logado
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push("/login");
      } else {
        fetchProjetos();
      }
    };

    fetchUser();
  }, [router]);

  // Função para buscar os projetos
  const fetchProjetos = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("projetos")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setProjetos(data || []);
    } catch (err: any) {
      setError(err.message);
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

  // Função para navegar para a página de edição
  const handleEdit = (projetoId: string) => {
    router.push(`/admin/editar/${projetoId}`);
  };

  // Função para excluir projeto
  const handleDelete = async (projetoId: string) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
        const { error } = await supabase.from('projetos').delete().eq('id', projetoId);
        if (error) {
            console.error('Erro ao excluir projeto:', error);
            alert('Erro ao excluir projeto. Verifique o console.');
        } else {
            alert('Projeto excluído com sucesso!');
            fetchProjetos();
        }
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Gerenciar Projetos</h2>
            <div className="flex items-center space-x-4">
              <Link href="/admin/novo" passHref>
                <button className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600">
                  Adicionar Novo Projeto
                </button>
              </Link>
              <Link href="/admin/curriculo" passHref>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Adicionar Currículo
                </button>
              </Link>
            </div>
          </div>
          
          {loading && <p>Carregando projetos...</p>}
          {error && <p className="text-red-500">Erro: {error}</p>}
          
          {!loading && !error && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Projetos Existentes</h3>
              {projetos.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
              ) : (
                <ul className="space-y-4">
                  {projetos.map((projeto) => (
                    <li key={projeto.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-lg">{projeto.titulo}</h4>
                        <p className="text-gray-600">{projeto.descricao.substring(0, 80)}...</p>
                      </div>
                      <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                        <button
                            onClick={() => handleEdit(projeto.id)}
                            className="flex items-center space-x-2 bg-sky-600 text-white px-3 py-1 rounded-md hover:bg-sky-700 transition-colors"
                            title="Editar"
                        >
                            <FaEdit />
                            <span>Editar</span>
                        </button>
                        <button
                            onClick={() => handleDelete(projeto.id)}
                            className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors"
                            title="Excluir"
                        >
                            <FaTrash />
                            <span>Excluir</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}