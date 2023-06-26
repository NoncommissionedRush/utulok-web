"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Disable scroll when mobile nav is open
  useEffect(() => {
    isOpen
      ? (document.body.style.overflowY = "hidden")
      : (document.body.style.overflowY = "auto");
  }, [isOpen]);

  return (
    <header className="fixed top-0 flex justify-between w-full bg-theme-yellow p-3 z-50">
      <div>LOGO</div>

      <div
        className={`w-full h-screen bg-theme-yellow border-t border-black lg:border-t-0 lg:h-auto flex flex-col lg:flex-row items-center text-center gap-10 lg:justify-between p-3 lg:p-0 absolute lg:relative top-full left-0 transform lg:translate-x-0 transition-transform duration-500 lg:transition-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="mx-auto">
          <ul className="flex flex-col lg:flex-row gap-10 lg:gap-3">
            <li>
              <Link
                href="/"
                className="hover:underline"
                onClick={() => isOpen && setIsOpen(false)}
              >
                Domov
              </Link>
            </li>
            <li>
              <Link
                href="/onas"
                className="hover:underline"
                onClick={() => isOpen && setIsOpen(false)}
              >
                O nás
              </Link>
            </li>
            <li>
              <Link
                href="/psiky"
                className="hover:underline"
                onClick={() => isOpen && setIsOpen(false)}
              >
                Naše psíky
              </Link>
            </li>
            <li>
              <Link
                href="/pomoc"
                className="hover:underline"
                onClick={() => isOpen && setIsOpen(false)}
              >
                Ako pomôcť
              </Link>
            </li>
            <li>
              <Link
                href="/kontakt"
                className="hover:underline"
                onClick={() => isOpen && setIsOpen(false)}
              >
                Kontakt
              </Link>
            </li>
          </ul>
        </nav>
        <div className="border border-black lg:border-0 p-3 lg:p-0">
          <Link href="tel:+421000000000">+421 000 000 000</Link>
        </div>
      </div>
      <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        🐶
      </button>
    </header>
  );
}
