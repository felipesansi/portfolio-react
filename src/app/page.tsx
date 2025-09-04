import Hero from "@/components/hero/hero";
import Projetos from "@/components/projetos/projetos";
import Stack from "@/components/Stack/stack";
import { supabase } from "@/lib/supabase/supabase";

export const revalidate = 60; // Revalida os dados a cada 60 segundos

export default async function Home() {
  const { data: projetos, error } = await supabase
    .from("projetos")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <>
      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
       
      >
        <Hero />
      </div>

      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
        data-aos="fade-up"
      >
        <Stack />
      </div>

      <div
        className="w-full min-h-screen flex flex-col overflow-x-hidden"
        data-aos="fade-up"
      >
        {projetos && <Projetos dadosProjetos={projetos} />}
        {error && <p className="text-center text-red-500">Erro ao carregar os projetos.</p>}
        <div className="flex justify-center mt-6" data-aos="zoom-in">
          <a
            href="/projetos"
            className="bg-sky-700 text-white px-4 py-2 rounded flex items-center"
          >
            Ver mais projetos
          </a>
        </div>
      </div>

          
    </>
  );
}