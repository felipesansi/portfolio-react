'use client';

import { FaExternalLinkAlt, FaGithub, FaDownload, FaStar} from "react-icons/fa";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function useAOS() {
  useEffect(() => {
    aos.init({ duration: 800, once: true });
  }, []);
}

// define a interface para os dados do projeto
interface Projeto {
  id: any;
  imagem_url: string;
  titulo: string;
  descricao: string;
  stack: string[];
  live_url: string;
  github_url:string;
  is_apk: boolean;
  apk_download_url?: string;
}

// define o componente Projetos
interface ProjetosProps {
  dadosProjetos: Projeto[];
}

export default function Projetos({ dadosProjetos }: ProjetosProps) {
  useAOS();

  if (!dadosProjetos) {
    return <p className="text-center text-lg">Carregando projetos...</p>;
  }


  const lerProjetos = dadosProjetos;

  return (
    <>
      <h1 className="text-5xl font-bold leading-tight text-center mb-3 text-sky-700">
        Projetos
      </h1>
      <p className="text-xl font-light text-center mb-10">
        Alguns projetos que eu desenvolvi
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {lerProjetos.map((projeto, index) => (
          <div
            key={projeto.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
            data-aos-duration="800"
            data-aos-once="true"
            data-aos-delay={index * 100}
          >
            <img
              src={projeto.imagem_url}
              alt={projeto.titulo}
              className="w-full h-48 object-contain p-4 bg-sky-950 hover:bg-sky-200 transition-colors"
            />
            
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800 text-center mb-2">
                {projeto.titulo}
              </h3>
                  <div className="mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className="inline text-yellow-500 mr-1 align-text-top" />
                  
                ))}
                <span className="text-gray-600 text-sm align-text-top flex ">(5.0)</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{projeto.descricao}</p>
              <p className="text-gray-800 text-sm font-bold mb-4">
                Stack: {projeto.stack.join(", ")}
              </p>
          
              <div className="flex justify-start items-center gap-2 flex-wrap">
                <a
                  href={projeto.live_url && projeto.live_url !== "#" ? projeto.live_url : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    bg-sky-700 text-white px-4 py-2 rounded flex items-center text-sm transition-colors
                    ${projeto.live_url && projeto.live_url !== "#" 
                      ? 'hover:bg-sky-800' 
                      : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Ver Projeto
                </a>
                <a
                  href={projeto.github_url && projeto.github_url !== "#" ? projeto.github_url : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center text-sm transition-colors
                    ${projeto.github_url && projeto.github_url !== "#" 
                      ? 'hover:bg-gray-300' 
                      : 'opacity-50 cursor-not-allowed'}
                  `}
                >
           
                  <FaGithub className="mr-2" />
                  Código
                </a>
                {projeto.is_apk && projeto.apk_download_url && (
                  <a
                    href={projeto.apk_download_url}
                    download
                    className="bg-green-600 text-white px-4 py-2 rounded flex items-center text-sm hover:bg-green-700 transition-colors"
                  >
                    Download App <FaDownload className="ml-2" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}