'use client';

import { supabase } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function GerenciarProjetosPage() {
    const [projetos, setProjetos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchProjetos = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('projetos').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Erro ao carregar projetos:', error);
            alert('Erro ao carregar projetos. Verifique o console.');
        } else {
            setProjetos(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjetos();
    }, []);

    const handleDelete = async (projetoId: string) => {
        if (confirm("Tem certeza que deseja excluir este projeto?")) {
            const { error } = await supabase.from('projetos').delete().eq('id', projetoId);
            if (error) {
                console.error('Erro ao excluir projeto:', error);
                alert('Erro ao excluir projeto. Verifique o console.');
            } else {
                alert('Projeto excluído com sucesso!');
                fetchProjetos(); // Recarrega a lista após a exclusão
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando projetos...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Gerenciar Projetos</h2>
                    <Link href="/admin/novo" className="bg-sky-700 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors">
                        Adicionar Novo Projeto
                    </Link>
                </div>
                
                {projetos.length === 0 ? (
                    <div className="text-center text-gray-500 mt-12">Nenhum projeto encontrado.</div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {projetos.map((projeto) => (
                                <li key={projeto.id} className="p-4 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold">{projeto.titulo}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{projeto.descricao.substring(0, 100)}...</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => router.push(`/admin/editar/${projeto.id}`)}
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
                    </div>
                )}
            </div>
        </div>
    );
}