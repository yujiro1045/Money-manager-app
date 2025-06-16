import { useRouter } from "next/navigation";
import React from "react";
import { CustomButton } from "./CustomButton";
import { RoutesEnum } from "@/app/enum/routes.enum";
import { logoutUser } from "@/libs/auth";

type HeaderProps = {
  userName: string;
};

const Header = ({ userName }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.push(RoutesEnum.LOGIN);
  };
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-slate-800">
        Dashboard de Finanzas
      </h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-600">
          Bienvenido,{" "}
          <span className="font-medium text-blue-600">{userName}</span>
        </p>
        <CustomButton
          text="Cerrar sesión"
          size="sm"
          color="red"
          onclick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Header;
