import Image from "next/image";

export default function About() {
  return (
    <section className="relative w-full scroll-mt-14">
      <div className="container flex flex-col mb-20">
        <h1 className="my-5 text-3xl font-titan text-stroke-bold-yellow text-theme-pink">
          O nás
        </h1>
        <div className="my-5 max-w-4xl text-theme-pink">
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum
            maxime eveniet quo dolores voluptatum quibusdam, aperiam blanditiis
            esse numquam fugit atque quam? Maiores commodi consequuntur nostrum.
            Iure sapiente amet commodi accusamus, voluptas perferendis autem
            illum fugit at excepturi a, eos libero in, delectus nostrum non
            veniam? Saepe eius beatae iusto!
          </p>
          <p className="mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore
            quaerat perferendis optio nulla deleniti obcaecati velit beatae a
            pariatur, minima qui deserunt fugiat cumque cupiditate
            exercitationem sapiente voluptas ea! Provident dicta natus
            consequuntur. Modi harum natus, voluptas adipisci laboriosam
            nesciunt, distinctio suscipit in excepturi pariatur, neque
            consequuntur reprehenderit iusto!
          </p>
        </div>

        <Image
          src="/utulok-logo.png"
          alt="logo"
          width={"175"}
          height={"175"}
          priority
          className="rounded-full mx-auto my-10"
        />
        <div className="flex flex-col sm:flex-row gap-5 md:gap-10 my-10 justify-center text-center">
          <div>
            <Image
              src="/team/one.png"
              alt="member one"
              width={"75"}
              height={"75"}
              className="rounded-full mx-auto mb-2 md:w-24 md:h-24"
            />
            <p>Mária Ďuríčková</p>
          </div>
          <div>
            <Image
              src="/team/two.png"
              alt="member two"
              width={"75"}
              height={"75"}
              className="rounded-full mx-auto mb-2 md:w-24 md:h-24"
            />
            <p>Klára Jarunková</p>
          </div>
          <div>
            <Image
              src="/team/three.png"
              alt="member three"
              width={"75"}
              height={"75"}
              className="rounded-full mx-auto mb-2 md:w-24 md:h-24"
            />
            <p>Ľudmila Podjavorinská</p>
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
  );
}
