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
    const { email, password, name } = data;
    try {
      await registerUser(email, password, name);
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
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 sm:p-10 flex flex-col justify-center relative order-last md:order-first">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
          <div className="relative z-10 space-y-5 text-center md:text-left">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto md:mx-0">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-white"
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
            <h2 className="text-2xl sm:text-3xl font-bold">Money Manager</h2>
            <p className="text-base sm:text-lg text-emerald-100">
              La forma más fácil de llevar el control de tus finanzas.
            </p>
            <p className="text-sm text-emerald-200">
              Tus finanzas, tu futuro. Únete a nosotros y empieza a gestionar
              tus gastos e ingresos de manera sencilla y efectiva.
            </p>
            <div className="space-y-2 pt-4">
              {[
                "Control total de gastos e ingresos",
                "Reportes detallados y análisis",
                "Interfaz intuitiva y fácil de usar",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-sm text-emerald-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-10 bg-white">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
              Crear cuenta
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Únete y comienza a gestionar tus finanzas
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 sm:space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 hover:bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
              {errors.name && (
                <p className="text-rose-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <ErrorIcon />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 hover:bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "El correo no es válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-rose-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <ErrorIcon />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-lg p-3 bg-slate-50 hover:bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres",
                  },
                })}
              />
              {errors.password && (
                <p className="text-rose-500 text-xs sm:text-sm mt-1 flex items-center gap-1">
                  <ErrorIcon />
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

            <p className="text-center text-xs sm:text-sm text-slate-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href={RoutesEnum.LOGIN}
                className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const ErrorIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

export default RegisterPage;
