"use client";

import { registerUser } from "@/libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 space-y-4 grid">
        <h2 className="text-2xl font-bold">Crear cuenta</h2>
        <input
          type="email"
          className="border p-2 w-150"
          placeholder="Ingresa tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-150"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white p-2 w-150">
          Registrarse
        </button>
        <Link href="/login" className="text-blue-600 underline text-center">
          Ya tienes una cuenta? inicia sesión aquí
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
