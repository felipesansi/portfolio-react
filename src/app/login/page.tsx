'use client'

import React, { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [erro , setError] = useState("");
    const [success , setSuccess] = useState("");
    return (
    <div>   
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form className="space-y-4">
                {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}
                {success && <div className="text-green-500 text-sm mb-4">{success}</div>}
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-sky-700"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-700 text-white py-2
                    rounded hover:bg-sky-600 transition duration-200"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
                <div className="text-center">
                    <a href="/cadastro" className="text-sky-700 hover:underline">
                        Nao tem uma conta? Cadastre-se
                
                    </a>
                </div>
            </form>
        </div>
    </div>
                    
    </div>
    );
}
