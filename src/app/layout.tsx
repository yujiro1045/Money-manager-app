import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import FirestoreProvider from "./context/FireStoreContext";
import "./globals.css";

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
          <body>{children}</body>
        </FirestoreProvider>
      </AuthProvider>
    </html>
  );
}
