import icons from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
export default function Header() {
  return (
    <header className="flex justify-between items-center  m-13">
      <div className="text-2xl font-bold">Felipe Dev</div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:text-gray-400 px-10">
              Início
            </a>
          </li>

          <li>
            <a href="/projetos" className="hover:text-gray-400 px-10">
              Projetos
            </a>
          </li>
          <li>
            <a href="/contato" className="hover:text-gray-400 px-10">
              Contato
            </a>
          </li>

          <li>
            <a href="/servicos" className="hover:text-gray-400 px-10">
              Serviços
            </a>
          </li>

          <li>
            <a className="text-gray-400 hover:text-gray-800 transition-colors duration-300 ease-out" href="https://www.linkedin.com/in/felipesansi" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl" />
            </a>
          </li>
          <li>
            <a
              className="text-gray-400 hover:text-gray-800 transition-colors duration-300 ease-in-out"
              href="https://github.com/felipesansi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-3xl" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
