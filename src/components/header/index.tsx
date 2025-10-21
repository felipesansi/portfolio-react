"use client";
import { useState } from "react";
import { FaLinkedin, FaGithub, FaBars, } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white fixed top-0 left-0 w-full z-50">
   
        <div className="text-2xl font-bold">Felipe Dev</div>

        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
        </button>

   
        <nav
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col items-center justify-center absolute top-16 left-0 w-full bg-white md:static md:flex md:flex-row md:items-center md:justify-end`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 items-center text-center pb-4 md:pb-0">
            <li>
              <a href="/" className="text-lg hover:text-gray-400 px-4 md:px-10">
                Início
              </a>
            </li>
            <li>
              <a href="/projetos" className="text-lg hover:text-gray-400 px-4 md:px-10">
                Projetos
              </a>
            </li>
            <li>
              <a href="/contato" className="text-lg hover:text-gray-400 px-4 md:px-10">
                Contato
              </a>
            </li>
            <li>
              <a href="/servicos" className="text-lg hover:text-gray-400 px-4 md:px-10">
                Serviços
              </a>
            </li>
            <li className="mt-4 md:mt-0">
              <a
                className="text-gray-400 hover:text-gray-800 transition-colors duration-300 ease-out flex justify-center"
                href="https://www.linkedin.com/in/felipesansi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-3xl" />
              </a>
            </li>
            <li className="mt-2 md:mt-0">
              <a
                className="text-gray-400 hover:text-gray-800 transition-colors duration-300 ease-in-out flex justify-center"
                href="https://github.com/felipesansi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-3xl" />
              </a>
            </li>
            <li className="mt-2 md:mt-0">
              <a href="/login"  
              className="text-gray-400 hover:text-gray-800 transition-colors duration-300 ease-in-out flex justify-center"
              >
              <GrLogin className="text-3xl " />
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="pt-32" />
    </>
  );
}
