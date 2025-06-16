"use client";

import { loginUser } from "@/libs/auth";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { RoutesEnum } from "../enum/routes.enum";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/components/CustomButton";

const USER_NOT_FOUND = "auth/user-not-found";
const WRONG_PASSWORD = "auth/wrong-password";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);
      Swal.fire({
        icon: "success",
        text: "Bienvenido de nuevo!",
        title: "Inicio de sesión exitoso",
      });
      router.push(RoutesEnum.HOME);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión",
          text:
            error.code === USER_NOT_FOUND
              ? "El usuario no existe"
              : error.code === WRONG_PASSWORD
              ? "La contraseña es incorrecta"
              : "Hubo un problema al iniciar sesión, por favor verifica tus credenciales",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200">
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Bienvenido de nuevo</h2>
              <p className="text-lg mb-4 text-blue-100">
                Ingresa y mantén tus finanzas bajo control.
              </p>
              <p className="text-sm text-blue-200">
                Con Money Manager podrás visualizar tus ingresos y gastos de
                forma sencilla y efectiva.
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-10 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Iniciar sesión
            </h2>
            <p className="text-slate-600">Accede a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 hover:bg-white text-gray-500"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-rose-500 text-sm mt-1 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 hover:bg-white text-gray-500"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.password && (
                <p className="text-rose-500 text-sm mt-1 flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            <CustomButton
              text="Iniciar sesión"
              size="lg"
              color="blue"
              type="submit"
            />

            <div className="text-center">
              <p className="text-sm text-slate-600">
                ¿No tienes una cuenta?{" "}
                <Link
                  href={RoutesEnum.REGISTER}
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
