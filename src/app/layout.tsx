import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import FirestoreProvider from "./context/FireStoreContext";
import "./globals.css";
import AppInitializerContext from "./context/AppInitializerContext";

export const metadata: Metadata = {
  title: "Money Manager",
  description:
    "Aplicación de control financiero construida con Next.js, Firebase y Zustand. Permite registrar transacciones, calcular balances y visualizar resúmenes financieros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <AuthProvider>
        <FirestoreProvider>
          <AppInitializerContext>
            <body>{children}</body>
          </AppInitializerContext>
        </FirestoreProvider>
      </AuthProvider>
    </html>
  );
}
