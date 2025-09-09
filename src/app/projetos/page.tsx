// src/app/projetos/page.tsx (ou onde quer que sua rota esteja)
// Este é um Server Component por padrão no Next.js
// Ele será responsável por buscar os dados

import React from 'react';
import { supabase } from '@/lib/supabase/supabase';
import Projetos from '@/components/projetos/projetos';

export const revalidate = 1; // Revalida os dados a cada 60 segundos

export default async function ProjetosPage() {
    // Busca os dados diretamente no servidor
    const { data: projetos, error } = await supabase.from('projetos').select('*');

    if (error) {
        console.error("Erro ao carregar projetos:", error);
        return <p>Não foi possível carregar os projetos. Tente novamente mais tarde.</p>;
    }

    // Passa os dados para o componente 'ProjetosClient'
    return <Projetos dadosProjetos={projetos} />;
}