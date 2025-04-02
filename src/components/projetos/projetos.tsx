import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

export default function Projetos({limit }: { limit?: number }) {
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
          titulo: "Casa Fácil EPS.",
          descricao: "Sistema estilo imobiliario.",
          stack: ".net, c#, sql server, bootstrap",
          live: "https://casafacileps.com.br/",
          code: "#",
        },
        {
          id: 4,
          imagem: "/senha.png",
          titulo: "Gerador de Senhas",
          descricao:
            "Um gerador de senhas aleatórias que cria uma senha com o comprimento especificado pelo usuário..",
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
          descricao: "Segundo Portifólio.",
          stack: "HTML, CSS, JavaScript, Bootstrap, AOS Animation", 
          live: "https://felipesansi.github.io/portifolio-dev-felipe/",
          code: "https://github.com/felipesansi/portifolio-dev-felipe.git",
        },
        {
          id: 7,
          imagem: "/luna.ia.png",
          titulo: "Luna",
          descricao: "Assintente de computador que realiza ações: tocar musica pesquisar no google e muito mais.",
          stack: "Python, pyAudio, SpeechRecognition",
          live: "#",
          code: "https://github.com/felipesansi/Luna.ia.git",
        },
        {
          id: 8,
          imagem: "/whatsapp.png",
          titulo: "Projeto 8",
          descricao: "Automatização de mensagens no whatsapp.",
          stack: "node.js, whatsapp-web.js",
          live: "#",
          code: "https://github.com/felipesansi/Api-whats.git",
        },
        {
          id: 9,
          imagem: "/potifolio.png",
          titulo: "Projeto 9",
          descricao: "Este projeto é o site oficial da Software Opção, onde fornecemos informações sobre nossos serviços, equipe e formas de contato. O site está disponível em: Software Opção.",
          stack: "scss, html, javascript",
          live: "#",
          code: "https://github.com/felipesansi/PotifolioSoftwareOpcao.git",
        },
        {
          id: 10,
          imagem: "/facilt.png",
          titulo: "Projeto 10",
          descricao: "Trabalho de Conclusão de Curso - unifaat 2024.",
          stack: "C#, Bootstrap, SQL MYSQL, JavaScript",
          live: "#",
          code: "https://github.com/felipesansi/Facilit.git",
        },
      ];
    
      const projetosLimit = limit ? projetos.slice(0, limit) : projetos;
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
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  className="w-40 h-40 object-cover mx-auto mt-4"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 text-center">
                    {projeto.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm my-2">{projeto.descricao}</p>
                  <p className="text-gray-600 text-sm my-2 font-bold">
                    Stack: {projeto.stack}
                  </p>
                  <div className="flex justify-between mt-4">
                    <a
                      href={projeto.live}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-sky-700 text-white px-4 py-2 rounded flex items-center"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      acessar projeto
                    </a>
                    <a
                      href={projeto.code}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center"
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