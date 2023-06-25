import "./globals.css";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Útulok Web",
  description: "Web pre útulok",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pt-10">
        <Nav />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
