import React from "react";
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => (
  <footer className="bg-[#000000] text-white text-center py-4 w-full">
    <span>
      &copy; {new Date().getFullYear()}{" "}
      <a
        href="https://github.com/felipesansi"
        target="_blank"
        rel="noreferrer"
        className="text-sky-400 hover:underline"
      >
        Felipe Dev
      </a>
      . Todos os direitos reservados.
    </span>

    <div className="mt-2 flex justify-center items-center">
      <a
        href="https://www.linkedin.com/in/felipesansi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:underline mx-2 flex items-center justify-center"
      >
        <FaLinkedin className="mr-1" /> LinkedIn
      </a>
      <a
        href="https://github.com/felipesansi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:underline mx-2 flex items-center justify-center"
      >
        <FaGithub className="mr-1" /> GitHub
      </a>

    </div>
  </footer>
);

export default Footer;
