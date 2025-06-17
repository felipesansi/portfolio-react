"use client";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projetos({ limit }: { limit?: number }) {
  const projetos = [
    {
      id: 1,
      imagem: "/cobra.png",
      titulo: "Jogo da Cobra",
      descricao:
        "Um jogo clássico da cobra (Snake Game) desenvolvido com HTML, CSS e JavaScript puro.",
      stack: "HTML, JavaScript, CSS",
      live: "https://felipesansi.github.io/Jogo_cobra/",
      code: "#",
    },
    {
      id: 2,
      imagem: "/portifolio.png",
      titulo: "Primeiro Portifólio",
      descricao:
        "Este Portifólio foi desenvolvido utilizando HTML, CSS e Javascript.",
      stack: "HTML, CSS, JavaScript",
      live: "https://felipesansi.github.io/Site-Portifolio/",
      code: "https://github.com/felipesansi/Site-Portifolio.git",
    },
    {
      id: 3,
      imagem: "/Logo header - Casa Fácil EPS.png",
      titulo: "Casa Fácil EPS",
      descricao: "Sistema estilo imobiliário.",
      stack: ".NET, C#, SQL Server, Bootstrap",
      live: "https://casafacileps.com.br/",
      code: "#",
    },
    {
      id: 4,
      imagem: "/senha.png",
      titulo: "Gerador de Senhas",
      descricao:
        "Um gerador de senhas aleatórias com comprimento personalizado.",
      stack: "Bootstrap, JavaScript",
      live: "https://felipesansi.github.io/GeradorSenha/",
      code: "https://github.com/felipesansi/GeradorSenha.git",
    },
    {
      id: 5,
      imagem: "/relogio.png",
      titulo: "Cronômetro",
      descricao: "Cronômetro simples.",
      stack: "HTML, CSS, JavaScript",
      live: "https://felipesansi.github.io/Cronometro/",
      code: "#",
    },
    {
      id: 6,
      imagem: "/portifolio.png",
      titulo: "Segundo Portifólio",
      descricao: "Segundo Portifólio com animações AOS.",
      stack: "HTML, CSS, JavaScript, Bootstrap, AOS Animation",
      live: "https://felipesansi.github.io/portifolio-dev-felipe/",
      code: "https://github.com/felipesansi/portifolio-dev-felipe.git",
    },
    {
      id: 7,
      imagem: "/luna.ia.png",
      titulo: "Luna",
      descricao:
        "Assistente de computador que realiza ações como tocar música e pesquisar.",
      stack: "Python, pyAudio, SpeechRecognition",
      live: "#",
      code: "https://github.com/felipesansi/Luna.ia.git",
    },
    {
      id: 8,
      imagem: "/whatsapp.png",
      titulo: "Automação WhatsApp",
      descricao: "Automatização de mensagens via WhatsApp Web.",
      stack: "Node.js, whatsapp-web.js",
      live: "#",
      code: "https://github.com/felipesansi/Api-whats.git",
    },
    {
      id: 9,
      imagem: "/potifolio.png",
      titulo: "Site Software Opção",
      descricao:
        "Site oficial da Software Opção com informações de serviços e contato.",
      stack: "SCSS, HTML, JavaScript",
      live: "#",
      code: "https://github.com/felipesansi/PotifolioSoftwareOpcao.git",
    },
    {
      id: 10,
      imagem: "/facilt.png",
      titulo: "Facilit TCC",
      descricao: "Trabalho de Conclusão de Curso - Unifaat 2024.",
      stack: "C#, Bootstrap, MySQL, JavaScript",
      live: "#",
      code: "https://github.com/felipesansi/Facilit.git",
    },
    {
      id: 11,
      imagem: "/facilt.png",
      titulo: "E-commerce com Mercado Pago",
      descricao: "Loja virtual com integração ao Mercado Pago.",
      stack: "C#, Bootstrap, SQL, JavaScript, Dropbox, Mercado Pago",
      live: "#",
      code: "#",
    },
  ];

  const projetosLimit = limit ? projetos.slice(0, limit) : projetos;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, link: string) => {
    if (link === "#") {
      e.preventDefault();
      alert("Este link não está disponível.");
    }
  };

  return (
    <>
      <h1 className="text-5xl font-bold leading-tight text-center mb-3 text-sky-700">
        Projetos
      </h1>
      <p className="text-xl font-light text-center mb-10">
        Alguns projetos que eu desenvolvi
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {projetosLimit.map((projeto) => (
          <div
            key={projeto.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={projeto.imagem}
              alt={projeto.titulo}
              className="w-full h-48 object-contain p-4 bg-gray-50"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800 text-center mb-2">
                {projeto.titulo}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{projeto.descricao}</p>
              <p className="text-gray-800 text-sm font-bold mb-4">
                Stack: {projeto.stack}
              </p>
              <div className="flex justify-between items-center gap-2">
                <a
                  href={projeto.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleClick(e, projeto.live)}
                  className="bg-sky-700 text-white px-4 py-2 rounded flex items-center text-sm hover:bg-sky-800 transition-colors"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  Ver Projeto
                </a>
                <a
                  href={projeto.code}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => handleClick(e, projeto.code)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center text-sm hover:bg-gray-300 transition-colors"
                >
                  <FaGithub className="mr-2" />
                  Código
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
