"use client";

import { registerUser } from "@/libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { RoutesEnum } from "../enum/routes.enum";
import { FirebaseError } from "firebase/app";

const EMAIL_CONFLICT_CODE = "auth/email-already-in-use";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Bienvenido a la aplicación!",
      });
      router.push(RoutesEnum.HOME);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text:
            error.code === EMAIL_CONFLICT_CODE
              ? "El correo ya está en uso"
              : "Hubo un problema al registrarse, por favor verifica tus credenciales",
        });
      }
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
        <Link
          href={RoutesEnum.LOGIN}
          className="text-blue-600 underline text-center"
        >
          Ya tienes una cuenta? inicia sesión aquí
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
