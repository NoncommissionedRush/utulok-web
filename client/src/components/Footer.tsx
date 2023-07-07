import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative flex flex-col gap-5 justify-center items-center text-center p-10 mt-auto bg-yellow-300 text-theme-pink">
      <div className="flex gap-5 text-2xl">
        <Link href="#" className="hover:text-theme-light">
          {" "}
          <FaFacebook />
        </Link>
        <Link href="#" className="hover:text-theme-light">
          {" "}
          <BsInstagram />
        </Link>
      </div>
      <div>
        <p>
          Adresa:
          <br />
          OZ Útulok
          <br />
          Utekáč 666
          <br />
          Slovensko
        </p>
      </div>
      <div>
        Email:{" "}
        <a href="mailto:utulok@utulok.sk" className="hover:text-theme-light">
          utulok@utulok.sk
        </a>
        <br />
        Tel:{" "}
        <a href="tel:+421000000000" className="hover:text-theme-light">
          +421 000 000 000
        </a>
      </div>
      <Image
        src={"/pes.png"}
        alt="psik nezbednik"
        width={30}
        height={30}
        className="absolute bottom-0"
      />
    </footer>
  );
}
