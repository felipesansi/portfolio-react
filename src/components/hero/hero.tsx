"use client";

import React, { useCallback } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  const buscarArquivoCurriculo = useCallback(async () => {
    try {
      const { data, error } = await supabase.storage
        .from("curriculo")
        .download("curriculo.pdf");

      if (error) {
        console.error("Erro ao baixar currículo:", error);
        alert("Não foi possível baixar o currículo. Tente novamente.");
        return;
      }

      if (data) {
        const url = window.URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "curriculo-felipe.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 bg-white text-gray-700">
      {/* Texto da esquerda */}
      <div
        className="flex flex-col items-center md:items-start text-center md:text-left md:flex-1"
        data-aos="fade-right"
        data-aos-duration="1200"
      >
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">Olá,</h1>
        <p className="text-2xl md:text-4xl font-light">meu nome é</p>
        <h2 className="text-4xl md:text-5xl font-bold">
          <span className="text-blue-500">Felipe F.</span>
        </h2>
        <p className="text-2xl md:text-4xl font-semibold mt-2">
          Sou desenvolvedor
        </p>

        {/* Botão de download */}
        <button
          onClick={buscarArquivoCurriculo}
          className="mt-4 bg-sky-700 text-white px-6 py-2 rounded hover:bg-sky-800 transition-colors duration-300 flex items-center justify-center gap-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Baixar Currículo
          <FaDownload />
        </button>
      </div>

      {/* Imagem da direita */}
      <div
        className="flex items-center justify-center mb-6 md:mb-0 md:flex-1"
        data-aos="fade-left"
        data-aos-duration="1200"
      >
        <img
          src="/Hero.svg"
          alt="Felipe F."
          className="w-48 h-48 md:w-96 md:h-96 object-cover rounded-[40%] border-8 border-blue-400"
        />
      </div>
    </div>
  );
}
