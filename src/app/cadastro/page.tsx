'use client';

import React, { useState } from "react";
import { supabase } from "../../lib/supabase/supabase";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cadastrarUsuario = async () => {
    setLoading(true);

    try {
      // 1. Cria o usuário
      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (error) {
        throw new Error("Erro ao cadastrar: " + error.message);
      }

      if (!data?.user?.id) {
        throw new Error("Usuário não foi criado corretamente.");
      }

      // 2. Salva o nome na tabela 'usuarios'
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          name: nome,
          email: email,
        },
      ]);

      if (profileError) {
        throw new Error("Erro ao salvar perfil: " + profileError.message);
      }

      alert("Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.");
      router.replace("/login");
    } catch (err: any) {
      console.error(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastro</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-600 transition duration-200"
            onClick={(e) => {
              e.preventDefault();
              cadastrarUsuario();
            }}
            disabled={loading}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}