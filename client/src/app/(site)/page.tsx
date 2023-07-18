import Image from "next/image";
import Link from "next/link";
import DogSampleList from "@/components/DogSampleList";

//bg-[url('/dogs.png')] bg-cover bg-center bg-no-repeat

export default function Home() {
  return (
    <>
      {/* Hero section */}
      <section className="relative min-h-[90vh] z-50 w-full scroll-mt-14">
        <div className="absolute inset-0 -z-20 before:absolute before:z-10 before:inset-0 before:bg-[rgba(255,255,255,0.3)]">
          <Image
            src={"/dogs.png"}
            alt="background image"
            fill={true}
            priority
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        </div>
        <div className="container flex flex-col mb-20">
          <div className="flex flex-col items-center my-14">
            <Image
              src="/utulok-logo.png"
              alt="logo"
              width={"200"}
              height={"200"}
              priority
              className="rounded-full"
            />
            <h1 className="my-14 text-3xl md:text-4xl font-titan text-center text-theme-pink font-bold text-stroke">
              Zachraňujeme psíky od roku 1492.
            </h1>
            <div className="relative group">
              <Link
                href={"/pomoc"}
                className="block max-w-fit px-8 py-2 rounded-3xl bg-theme-yellow font-bold text-xl text-stroke text-theme-pink shadow-[3px_4px_0px_2px_#000] hover:bg-theme-light"
              >
                Pomôcť
              </Link>
              <span className="absolute top-0 left-0 group-hover:animate-spin">
                ⭐
              </span>
              <span className="absolute -top-3 left-10 group-hover:animate-pulse">
                💗
              </span>
              <span className="absolute bottom-0 right-0 group-hover:animate-spin">
                ⭐
              </span>
              <span className="absolute top-0 right-0 group-hover:animate-pulse">
                💗
              </span>
              <span className="absolute -bottom-3 right-12 group-hover:animate-spin">
                ⭐
              </span>
              <span className="absolute top-8 left-0 group-hover:animate-pulse">
                💗
              </span>
            </div>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1688744264">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      {/* First section */}
      <section className="relative w-full scroll-mt-14 bg-theme-pink-light">
        <div className="container flex flex-col">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Naše psíky
          </h1>
        </div>
        <div className="md:container px-1 mb-20">
          <DogSampleList />
        </div>
        <div className="custom-shape-divider-bottom-1688744883">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      {/* Second section */}
      <section className="relative w-full scroll-mt-14">
        <div className="container flex flex-col mb-20">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Aktuálne potrebujeme vašu pomoc
          </h1>
          <div className="my-5 max-w-4xl mx-auto text-theme-pink">
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non ipsum
              omnis harum, odio aperiam doloremque sed, ab, eius nisi facere
              minus tempora fugit vero itaque accusantium exercitationem
              delectus aliquid veritatis.
            </p>
            <div className="flex gap-5 justify-center mb-5">
              <Image
                src={"/pes1.png"}
                alt="psik jeden"
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
              <Image
                src={"/pes2.png"}
                alt="psik jeden"
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
              <Image
                src={"/pes1.png"}
                alt="psik jeden"
                width={200}
                height={200}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
              />
            </div>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequuntur nulla, necessitatibus quidem molestiae repellat eos
              dolor sunt ex animi, praesentium blanditiis voluptates debitis.
              Quis rerum nobis, eos aliquam ut esse eius cupiditate neque.
              Pariatur reiciendis nobis corrupti beatae. Ad voluptatum vel
              sequi. Modi reprehenderit fuga incidunt aliquam quis nobis!
              Voluptas.
            </p>
            <a
              href="https://www.preutulky.sk/"
              target="_blank"
              rel="noopener"
              className="block max-w-fit px-4 py-2 mx-auto my-10 rounded-3xl text-theme-pink border-2 border-theme-pink hover:bg-theme-pink hover:text-theme-light"
            >
              Zapojte sa do aktuálnej výzvy
            </a>
            <p className="mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-1688744991">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      {/* Third section */}
      <section className="relative w-full scroll-mt-14 bg-theme-green">
        <div className="container flex flex-col mb-20">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Sledujte nás na Instagrame
          </h1>
          <div className="grid grid-cols-fit-grid gap-10 my-5 justify-center place-items-center text-center">
            <div className="relative saturate-50 border-8 border-theme-light rounded-3xl">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src={"/insta.png"}
                  alt="instagram logo"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              </a>
            </div>
            <div className="relative saturate-50 border-8 border-theme-light rounded-3xl">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src={"/insta.png"}
                  alt="instagram logo"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              </a>
            </div>
            <div className="relative saturate-50 border-8 border-theme-light rounded-3xl">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener"
              >
                <Image
                  src={"/insta.png"}
                  alt="instagram logo"
                  width={200}
                  height={200}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                />
              </a>
            </div>
          </div>
        </div>
        <div className="custom-shape-divider-bottom-footer">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}
