import ContactForm from "./ContactForm";
import Image from "next/image";
import { MdOutlinePlace } from "react-icons/md";

export default function Contact() {
  return (
    <section className="min-h-screen w-full scroll-mt-14">
      <div className="container flex flex-col">
        <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
          Kontaktujte nás
        </h1>

        <div className="flex flex-col lg:flex-row items-center my-14">
          <div className="lg:w-1/2">
            <ContactForm />
          </div>
          <div className="mt-14 lg:mt-0 mx-auto">
            <a href="https://www.google.com/maps/@48.1961669,17.0764262,14z?entry=ttu">
              <Image
                src={"/map.png"}
                alt="Mapa"
                width={350}
                height={350}
                priority
                className="hover:scale-95 transition"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </a>
            <div className="flex flex-col gap-6 mt-10 text-theme-pink text-xl text-center">
              <div className="flex justify-center items-center">
                <MdOutlinePlace className="text-3xl" />
                <a href="https://www.google.com/maps/@48.1961669,17.0764262,14z?entry=ttu">
                  {" "}
                  <p>8.209696, 17.083121</p>
                </a>
              </div>
              <p>
                <span className="text-2xl">OZ Útulok</span>
                <br />
                Utekáč 666
                <br />
                Slovensko
              </p>
              <p>
                IČO: 123 456 789
                <br />
                DIČ: 123 456 789
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
