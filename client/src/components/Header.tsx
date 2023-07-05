"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const currentRoute = usePathname();

  // Disable scroll when mobile nav is open
  useEffect(() => {
    isOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [isOpen]);

  const navLinks = [
    { title: "Domov", path: "/" },
    { title: "O nás", path: "/onas" },
    { title: "Naše psíky", path: "/psiky" },
    { title: "Ako pomôcť", path: "/pomoc" },
    { title: "Kontakt", path: "/kontakt" },
  ];

  const linkStyles =
    "px-5 py-1 rounded-3xl border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light hover:shadow-none";

  return (
    <header className="fixed top-0 w-full bg-theme-yellow z-50">
      <div className="container flex justify-between py-3">
        <div className="text-theme-pink font-bold">
          {" "}
          <Image
            src={"/utulok-logo.png"}
            alt="Dog shelter logo"
            width={35}
            height={35}
          />
        </div>

        <div
          className={`w-full h-screen bg-theme-yellow border-t border-black lg:border-t-0 lg:h-auto flex flex-col lg:flex-row items-center text-center gap-10 lg:gap-0 lg:justify-between p-3 lg:p-0 absolute lg:relative top-full left-0 transform lg:translate-x-0 transition-transform duration-500 lg:transition-none ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="mx-auto mt-5 lg:mt-0">
            <ul className="flex flex-col lg:flex-row gap-10 lg:gap-3">
              {navLinks.map((link, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={link.path}
                      className={
                        linkStyles +
                        (currentRoute === link.path ||
                        currentRoute.includes(link.path.replace(/\/+$/, " "))
                          ? " bg-theme-pink text-theme-light shadow-none"
                          : " text-theme-pink") +
                        (link.path === "/psiky"
                          ? " shadow-[3px_4px_0px_2px_#E4647B]"
                          : "")
                      }
                      onClick={() => isOpen && setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-2 border-theme-pink border-dotted lg:border-0 p-3 lg:p-0 hover:scale-110 transition">
            <Link
              href="tel:+421000000000"
              className="font-bold text-theme-pink text-stroke"
            >
              +421 000 000 000
            </Link>
          </div>
        </div>
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          🐶
        </button>
      </div>
    </header>
  );
}
