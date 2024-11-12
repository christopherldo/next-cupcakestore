import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import SessionProvider from "./SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Doce Mania - Loja de Cupcakes",
  description:
    "Delicie-se com nossa seleção irresistível de cupcakes artesanais feitos com os melhores ingredientes. Doce Mania – cupcakes que adoçam o seu dia!",
  openGraph: {
    images: [
      {
        url: "https://picsum.photos/1200/630",
        width: 1200,
        height: 630,
        alt: "Imagem promocional da Doce Mania - Loja de Cupcakes",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-[100dvh] flex-col`}>
        <SessionProvider>
          <Navbar />
          <main className="m-auto flex w-full min-w-[300px] max-w-7xl flex-1 p-4">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
