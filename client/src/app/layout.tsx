import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Útulok Web",
  description: "Web pre útulok",
};

const roboto = Roboto({
  weight: ["500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={roboto.className}>
      <body className="bg-theme-light pt-14 overflow-x-hidden">
        <Header />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
