"use client";
import React from "react";

const ServicosPage: React.FC = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Pacotes de Serviços
      </h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Confira os pacotes de serviços oferecidos para desenvolvimento de
        software e integração com Google Search Console.
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Pacote Básico */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pacote Básico
          </h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Desenvolvimento de landing page</li>
            <li>Configuração inicial do Google Search Console</li>
            <li>Relatório básico de desempenho</li>
          </ul>
        </div>

        {/* Pacote Intermediário */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300">
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

        {/* Pacote Avançado */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300">
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
    </div>
  );
};

export default ServicosPage;