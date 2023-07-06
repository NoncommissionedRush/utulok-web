import ContactForm from "./ContactForm";
import Image from "next/image";
import { MdOutlinePlace } from "react-icons/md";

export default function Contact() {
  return (
    <section className="min-h-screen w-full scroll-mt-14">
      <div className="container flex flex-col">
        <h1 className="my-3 text-2xl font-bold">Kontakt</h1>

        <div className="flex flex-col md:flex-row justify-around my-14">
          <ContactForm />
          <div className="mt-14 md:mt-0 mx-auto">
            <a href="https://www.google.com/maps/@48.1961669,17.0764262,14z?entry=ttu">
              <Image
                src={"/map.png"}
                alt="Mapa"
                width={350}
                height={350}
                priority
                className="hover:scale-95 transition"
              />
            </a>
            <div className="flex flex-col gap-6 mt-10 text-theme-pink text-xl text-center">
              <p>
                <span className="text-2xl">OZ Útulok</span>
                <br />
                Utekáč 666
                <br />
                Slovensko
              </p>
              <div className="flex justify-center items-center">
                <MdOutlinePlace className="text-3xl" />
                <a href="https://www.google.com/maps/@48.1961669,17.0764262,14z?entry=ttu">
                  {" "}
                  <p>8.209696, 17.083121</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
