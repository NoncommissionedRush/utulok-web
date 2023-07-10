"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const currentRoute = usePathname();

  // Disable scroll when mobile nav is open - horizontal mobile view -> cut by overflow hidden ❗❗...flex wrap added to nav
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

  const navStyles =
    "w-full h-screen overflow-y-auto xl:overflow-y-visible bg-theme-yellow border-t border-black xl:border-t-0 xl:h-auto flex flex-col flex-wrap xl:flex-row items-center xl:justify-between text-center gap-10 xl:gap-0  p-3 xl:p-0 absolute xl:relative top-full left-0 transform xl:translate-x-0 transition-transform duration-500 xl:transition-none";

  const linkStyles =
    "block w-36 px-5 py-1 rounded-3xl border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light hover:shadow-none";

  const hamburgerLineStyles =
    "h-1 w-6 my-0.5 rounded-full bg-black transition ease transform duration-300";

  return (
    <header className="fixed top-0 w-full bg-theme-yellow z-50">
      <div className="container flex justify-between py-3">
        <div className="text-theme-pink font-bold">
          <Link href={"/"}>
            <Image
              src={"/utulok-logo.png"}
              alt="Dog shelter logo"
              width={35}
              height={35}
              priority
              className="rounded-full"
            />
          </Link>
        </div>

        <div
          className={`${navStyles} ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="mx-auto mt-5 xl:mt-0">
            <ul className="flex flex-col xl:flex-row gap-12 xl:gap-5">
              {navLinks.map((link, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      href={link.path}
                      className={`
                        ${linkStyles}
                        ${
                          currentRoute === link.path ||
                          currentRoute.includes(link.path.replace(/\/+$/, " "))
                            ? " bg-theme-pink text-theme-light shadow-none"
                            : " text-theme-pink"
                        } 
                        ${
                          link.path === "/psiky"
                            ? " shadow-[3px_4px_0px_2px_#E4647B]"
                            : ""
                        }
                      `}
                      onClick={() => isOpen && setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-2 border-theme-pink border-dotted xl:border-0 p-3 xl:p-0 hover:scale-110 transition">
            <a
              href="tel:+421000000000"
              className="font-bold text-theme-pink text-stroke"
            >
              +421 000 000 000
            </a>
          </div>
        </div>
        <button
          className="xl:hidden flex flex-col justify-center items-center group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${hamburgerLineStyles} ${
              isOpen && "rotate-45 translate-y-2"
            }`}
          />
          <div className={`${hamburgerLineStyles} ${isOpen && "opacity-0"}`} />
          <div
            className={`${hamburgerLineStyles} ${
              isOpen && "-rotate-45 -translate-y-2"
            }`}
          />
        </button>
      </div>
    </header>
  );
}
