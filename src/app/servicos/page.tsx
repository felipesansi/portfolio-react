"use client";
import React, { useEffect } from "react";
import Link from "next/link";

import "aos/dist/aos.css";
import AOS from "aos";

const ServicosPage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1
        className="text-4xl font-bold text-center text-gray-800 mb-6"
        data-aos="fade-up"
      >
        Pacotes de Serviços
      </h1>
      <p
        className="text-lg text-center text-gray-600 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Confira os pacotes de serviços oferecidos para desenvolvimento de
        software e integração com Google Search Console.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pacote Básico
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Desenvolvimento de landing page</li>
            <li>Configuração inicial do Google Search Console</li>
            <li>Relatório básico de desempenho</li>
          </ul>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pacote Intermediário
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Desenvolvimento de site multi-páginas</li>
            <li>Integração completa com Google Search Console</li>
            <li>Otimização básica de SEO</li>
            <li>Relatórios mensais de desempenho</li>
          </ul>
        </div>

        <div
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pacote Avançado
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Desenvolvimento de aplicações web personalizadas</li>
            <li>Monitoramento contínuo no Google Search Console</li>
            <li>Otimização avançada de SEO</li>
            <li>Consultoria técnica e suporte dedicado</li>
          </ul>
        </div>
      </div>

      <div
        className="mt-12 text-center"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <p className="text-lg text-gray-600 mb-4">
          Entre em contato para mais informações sobre preços e disponibilidade.
        </p>
        <Link href="/contato">
          <button className="bg-gray-600  text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors duration-300">
            Solicitar Orçamento
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServicosPage;
