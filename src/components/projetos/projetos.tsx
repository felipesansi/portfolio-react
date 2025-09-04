'use client';

import { FaExternalLinkAlt, FaGithub, FaDownload } from "react-icons/fa";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export function useAOS() {
  useEffect(() => {
    aos.init({ duration: 800, once: true });
  }, []);
}

// Define the type for a single project
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

// Define the props for the component
interface ProjetosProps {
  dadosProjetos: Projeto[];
}

export default function Projetos({ dadosProjetos }: ProjetosProps) {
  useAOS();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    if (link === "#") {
      e.preventDefault();
      alert("Este link não está disponível.");
    }
  };

  if (!dadosProjetos) {
    return <p className="text-center text-lg">Carregando projetos...</p>;
  }


  const projetosRender = dadosProjetos;

  return (
    <>
      <h1 className="text-5xl font-bold leading-tight text-center mb-3 text-sky-700">
        Projetos
      </h1>
      <p className="text-xl font-light text-center mb-10">
        Alguns projetos que eu desenvolvi
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {projetosRender.map((projeto, index) => (
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
              <p className="text-gray-600 text-sm mb-2">{projeto.descricao}</p>
              <p className="text-gray-800 text-sm font-bold mb-4">
                Stack: {projeto.stack.join(", ")}
              </p>
              <div className="flex justify-between items-center gap-2">
                <a
                  href={projeto.live_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleClick(e, projeto.live_url)}
                  className="bg-sky-700 text-white px-4 py-2 rounded flex items-center text-sm hover:bg-sky-800 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Ver Projeto
                </a>
                <a
                  href={projeto.github_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleClick(e, projeto.github_url)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center text-sm hover:bg-gray-300 transition-colors"
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