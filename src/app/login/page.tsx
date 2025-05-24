"use client";

import { loginUser } from "@/libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      router.push("/");
    } catch (error: any) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="p-6 gap-4 grid  justify-center items-center "
      >
        <h2 className="text-2xl font-bold">Iniciar sesión</h2>
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
          Ingresar
        </button>

        <Link href="/register" className="text-blue-600 underline text-center">
          No tienes una cuenta? registrate aquí
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
