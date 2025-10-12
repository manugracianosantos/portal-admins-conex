// Este arquivo define a ESTRUTURA de TODAS as páginas


/* importações do metadata, tipo TypeScript para metadados da página, 
Geist, Geist_Mono fontes modernas do Google Fonts e ./globals.css, 
o sistema de design da mesma pasta */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans", // Cria variável CSS
  subsets: ["latin"], // Suporte a caracteres latinos
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*Metadados da página: Definem titulo(que fica na aba) e descrição da mesma*/
export const metadata: Metadata = {
  title: "Portal Administradores - Conex",
  description: "Painel administrativo para gerenciamento da plataforma Conex",
};

/*Esta é a real parte do body, onde mostra a estrutura que vai ser contruida*/
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children} 
      </body>
    </html>
  );
}
