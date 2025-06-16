"use client";

import { registerUser } from "@/libs/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import { RoutesEnum } from "../enum/routes.enum";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { CustomButton } from "@/components/CustomButton";

const EMAIL_CONFLICT_CODE = "auth/email-already-in-use";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    const { email, password } = data;
    try {
      await registerUser(email, password);
      Swal.fire({
        icon: "success",
        text: "Bienvenido a la aplicación!",
        title: "Registro exitoso",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200">
        <div className="w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Money Manager</h2>
              <p className="text-lg mb-4 text-emerald-100">
                La forma más fácil de llevar el control de tus finanzas.
              </p>
              <p className="text-sm text-emerald-200">
                Tus finanzas, tu futuro. Únete a nosotros y empieza a gestionar
                tus gastos e ingresos de manera sencilla y efectiva.
              </p>
            </div>

            <div className="space-y-3 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm text-emerald-100">
                  Control total de gastos e ingresos
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm text-emerald-100">
                  Reportes detallados y análisis
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm text-emerald-100">
                  Interfaz intuitiva y fácil de usar
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 p-10 bg-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Crear cuenta
            </h2>
            <p className="text-slate-600">
              Únete y comienza a gestionar tus finanzas
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-slate-50 hover:bg-white text-gray-500"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
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
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-slate-50 hover:bg-white text-gray-500"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-slate-50 hover:bg-white text-gray-500"
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
              text="Crear cuenta"
              size="lg"
              color="green"
              type="submit"
            />

            <div className="text-center">
              <p className="text-sm text-slate-600">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  href={RoutesEnum.LOGIN}
                  className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
                >
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
