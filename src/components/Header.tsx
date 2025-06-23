import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from "./CustomButton";
import { RoutesEnum } from "@/app/enum/routes.enum";
import { logoutUser } from "@/libs/auth";
import { useAuth } from "@/app/hooks/useAuth";

const Header = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    router.push(RoutesEnum.LOGIN);
  };
  return (
    <header className="w-full bg-white shadow-md border-b border-slate-200 mb-4 p-4 sm:p-6 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Dashboard de Finanzas
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-30 sm:w-auto">
          <p className="text-sm text-slate-600">
            Bienvenido,{" "}
            <span className="font-medium text-blue-600">
              {user?.displayName ?? user?.email ?? "Usuario"}
            </span>
          </p>
          <CustomButton
            text="Cerrar sesión"
            size="sm"
            color="red"
            onclick={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
