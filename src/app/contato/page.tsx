"use client";
import React, { useState } from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function Contato() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  function EnviarEmail(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const templateParams = {
      from_name: name,
      message: message,
      email: email,
    };

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
        },
        (error) => {
          console.error("Erro ao enviar o email:", error);
          alert("Erro ao enviar o email. Tente novamente.");
        }
      );

    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Entre em contato</h1>
      <p className="text-lg mb-8">Estou aqui para ajudar!</p>
      <div className="w-full max-w-md">
        <p className="text-gray-600 mb-4">
          Se você tiver alguma dúvida ou quiser discutir um projeto, sinta-se à
          vontade para entrar em contato.
        </p>
      </div>

      <form className="w-full max-w-md" onSubmit={EnviarEmail}>
        <input
          type="text"
          placeholder="Seu nome"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Seu email"
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Sua mensagem"
          className="border border-gray-300 rounded p-2 mb-4 w-full h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-600 transition duration-200"
        >
          Enviar
        </button>
      </form>
      <a
        href="https://wa.me/5511997494922"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-4 bottom-4 bg-green-950 px-4 py-2 rounded hover:bg-green-600 transition duration-200 shadow-lg"
      >
        <FaWhatsappSquare className="text-4xl text-amber-100" />
      </a>
    </div>
  );
}
