import Image from "next/image";
import Link from "next/link";

//bg-[url('/dogs.png')] bg-cover bg-center bg-no-repeat

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] w-full scroll-mt-14">
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
        <div className="container flex flex-col">
          {/* <h1 className="my-5 text-2xl font-bold">Domov</h1> */}
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
            <Link
              href={"/pomoc"}
              className=" max-w-fit my-12 px-8 py-2 rounded-3xl bg-theme-yellow font-bold text-xl text-stroke text-theme-pink shadow-[3px_4px_0px_2px_#000] hover:bg-theme-light"
            >
              Pomôcť
            </Link>
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

      <section className="relative min-h-screen w-full scroll-mt-14 bg-theme-pink-light">
        <div className="container flex flex-col min-h-screen">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Naše psíky
          </h1>
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

      <section className="relative min-h-screen w-full scroll-mt-14">
        <div className="container flex flex-col">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Aktuálne potrebujeme vašu pomoc
          </h1>
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
      <section className="min-h-screen w-full scroll-mt-14 bg-theme-green">
        <div className="container flex flex-col">
          <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
            Sledujte nás na Instagrame
          </h1>
        </div>
      </section>
    </>
  );
}
