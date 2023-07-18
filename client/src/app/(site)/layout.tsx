import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Roboto, Titan_One } from "next/font/google";

export const metadata = {
  title: "Útulok Web",
  description: "Web pre útulok",
};

const roboto = Roboto({
  weight: ["500", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const titan = Titan_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titan",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={`${roboto.variable} ${titan.variable}`}>
      <body className="flex flex-col bg-theme-light pt-14 font-roboto min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
