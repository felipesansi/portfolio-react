import React from 'react';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

const Footer: React.FC = () => (
  <footer className="bg-[#222] text-white text-center py-4 w-full">
    <span>
      &copy; {new Date().getFullYear()}{' '}
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
   
    <div className="mt-2">
      <a
        href="https://www.linkedin.com/in/felipesansi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:underline mx-2"
      >
        <i className="fab fa-linkedin"></i> LinkedIn
      </a>
      <a
        href="https://github.com/felipesansi"  
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:underline mx-2"
        >
        <i className="fab fa-github"></i> GitHub
        </a>
        <a 
        href="https://wa.me/5511997494922"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sky-400 hover:underline mx-2"
        >
        < i className="fab fa-whatsapp"></i> WhatsApp
        </a>
    </div>

  </footer>
);

export default Footer;
