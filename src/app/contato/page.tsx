"use client";

import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contato() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000, // duração padrão das animações
      once: true,     // anima apenas uma vez
    });
  }, []);

  function EnviarEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const templateParams = {
      from_name: name,
      message,
      email,
    };

    setIsSending(true);

    emailjs
      .send(
        "service_x7c3l28",
        "template_knaax8q",
        templateParams,
        "qrDM-8yCiaJkXYxu2"
      )
      .then(
        (response) => {
          console.log(
            "Email enviado com sucesso!",
            response.status,
            response.text
          );
          alert("Email enviado com sucesso!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          alert("Erro ao enviar o email. Tente novamente.");
        }
      )
      .finally(() => setIsSending(false));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1
        className="text-4xl font-bold mb-2 text-center"
        data-aos="fade-down"
      >
        Entre em contato
      </h1>
      <p
        className="text-lg mb-6 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Estou aqui para ajudar!
      </p>
      <div
        className="w-full max-w-md"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <p className="text-gray-600 mb-4 text-center">
          Se você tiver alguma dúvida ou quiser discutir um projeto, sinta-se à
          vontade para entrar em contato.
        </p>
      </div>

      <form
        className="w-full max-w-md"
        onSubmit={EnviarEmail}
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <input
          type="text"
          placeholder="Seu nome"
          className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seu email"
          className="border border-gray-300 rounded p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-sky-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Sua mensagem"
          className="border border-gray-300 rounded p-2 mb-4 w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-sky-700"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          disabled={isSending}
          className={`bg-sky-700 text-white px-4 py-2 rounded w-full hover:bg-sky-600 transition duration-200 ${
            isSending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <a
        href="https://wa.me/5511997494922"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 bg-green-700 px-4 py-2 rounded-full hover:bg-green-600 transition duration-200 shadow-lg"
        aria-label="Fale comigo no WhatsApp"
        data-aos="fade-left"
        data-aos-delay="800"
      >
        <FaWhatsapp className="text-4xl text-white" />
      </a>
    </div>
  );
}
