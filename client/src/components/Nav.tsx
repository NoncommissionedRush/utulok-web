import Link from "next/link";

export default function Nav() {
  return (
    <header className="fixed top-0 flex justify-between w-full bg-yellow-300 p-3 z-50">
      <div>LOGO</div>
      <nav className="flex gap-3">
        <Link href="/" className="hover:underline">
          Domov
        </Link>
        <Link href="/about" className="hover:underline">
          O nás
        </Link>
        <Link href="/dogs" className="hover:underline">
          Naše psíky
        </Link>
        <Link href="/help" className="hover:underline">
          Ako pomôcť
        </Link>
        <Link href="/contact" className="hover:underline">
          Kontakt
        </Link>
      </nav>
      <div>
        <a href="tel:+421000000000">+421 000 000 000</a>
      </div>
    </header>
  );
}
